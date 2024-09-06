module my_addrx::Staking { 
    use std::signer;
    use std::string::{String, utf8};
    use std::vector;
    use aptos_framework::object;
    use aptos_framework::aptos_account;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::{AptosCoin};
    use aptos_framework::timestamp;

    /// Error codes
    const EINSUFFICIENT_STAKE: u64 = 0;
    const EINVALID_UNSTAKE_AMOUNT: u64 = 1;
    const EINVALID_REWARD_AMOUNT: u64 = 2;
    const EINVALID_APY: u64 = 3;
    const EINSUFFICIENT_BALANCE: u64 = 4;
    const ENOT_ADMIN: u64 = 5;
    const EINVALID_VOTE_TIME: u64 = 6;
    const EALREADY_VOTED: u64 = 7;

    const VAULT_SEED: vector<u8> = b"VAULT";

    struct VoteRepository has store, key {
        votes: vector<Vote>,
    }

    struct Vote has store {
        id: u64,
        title: String,
        description: String,
        start_time: u64,
        end_time: u64,
        total_yes_votes: u64,
        total_no_votes: u64,
        completed: bool,
        voters: vector<address>,
    }

    struct StakedBalance has store, key {
        staked_balance: u64,
    }

    struct Vault has key {
        extend_ref: object::ExtendRef,
    }

    fun init_module(sender: &signer) {
        let vault_constructor_ref = &object::create_named_object(sender, VAULT_SEED);
        let vault_signer = &object::generate_signer(vault_constructor_ref);

        move_to(vault_signer, Vault {
            extend_ref: object::generate_extend_ref(vault_constructor_ref),
        });

        move_to(sender, VoteRepository {
            votes: vector::empty(),
        });
    }

    // ================================= Entry Functions ================================== //

    public entry fun stake(acc_own: &signer, amount: u64) acquires StakedBalance {
        let from = signer::address_of(acc_own);
        let balance = coin::balance<AptosCoin>(from);
        assert!(balance >= amount, EINSUFFICIENT_BALANCE);

        if(!exists<StakedBalance>(from)) {
            let staked_balance = StakedBalance {
                staked_balance: amount,
            };
            move_to(acc_own, staked_balance);
        } else {
            let staked_balance = borrow_global_mut<StakedBalance>(from);
            staked_balance.staked_balance = staked_balance.staked_balance + amount;
        };

        aptos_account::transfer(acc_own, get_vault_addr(), amount);
    }

    public entry fun unstake(acc_own: &signer,amount: u64) acquires StakedBalance, Vault {
        let from = signer::address_of(acc_own);
        let staked_balance = borrow_global_mut<StakedBalance>(from);
        let staked_amount = staked_balance.staked_balance;
        assert!(staked_amount >= amount, EINVALID_UNSTAKE_AMOUNT);
        aptos_account::transfer(&get_vault_signer(), from, amount);
        staked_balance.staked_balance = staked_balance.staked_balance - amount;
    }

    public entry fun create_vote(acc_own: &signer, title: String, description: String, start_time: u64, end_time: u64) acquires VoteRepository {
        let from = signer::address_of(acc_own);
        assert!(is_admin(from), ENOT_ADMIN);

        let vote_repository = borrow_global_mut<VoteRepository>(from);
        let vote = Vote {
            id: vector::length(&vote_repository.votes),
            title,
            description,
            start_time,
            end_time,
            total_yes_votes: 0,
            total_no_votes: 0,
            completed: false,
            voters: vector::empty(), // Initialize voters vector
        };
        vector::push_back(&mut vote_repository.votes, vote);
    }

    public entry fun vote(acc_own: &signer, vote_id: u64, amount: u64, is_yes_vote: bool) acquires VoteRepository, StakedBalance {
        let vote_repository = borrow_global_mut<VoteRepository>(@my_addrx);
        let vote = vector::borrow_mut(&mut vote_repository.votes, vote_id);
        assert!(vote.start_time <= timestamp::now_seconds() && vote.end_time >= timestamp::now_seconds(), EINVALID_VOTE_TIME);

        let from = signer::address_of(acc_own);
        
        // Check if the user has already voted
        assert!(!vector::contains(&vote.voters, &from), EALREADY_VOTED);

        // Lock staked balance
        let staked_balance = borrow_global_mut<StakedBalance>(from);
        assert!(staked_balance.staked_balance >= amount, EINSUFFICIENT_STAKE);

        if(is_yes_vote) {
            vote.total_yes_votes = vote.total_yes_votes + amount;
        } else {
            vote.total_no_votes = vote.total_no_votes + amount;
        };

        // Add the voter to the list of voters
        vector::push_back(&mut vote.voters, from);
    }

    public entry fun declare_winner(acc_own: &signer, vote_id: u64) acquires VoteRepository {
        let from = signer::address_of(acc_own);
        assert!(is_admin(from), ENOT_ADMIN);

        let vote_repository = borrow_global_mut<VoteRepository>(from);
        let vote = vector::borrow_mut(&mut vote_repository.votes, vote_id);
        assert!(vote.end_time <= timestamp::now_seconds(), EINVALID_VOTE_TIME);

        vote.completed = true;
    }


    // ================================= View Functions ================================== //

    #[view]
    public fun get_vault_addr(): address {
        object::create_object_address(&@my_addrx, VAULT_SEED)
    }

    #[view]
    public fun get_staked_balance(addr: address): u64 acquires StakedBalance {
        let staked_balance = borrow_global<StakedBalance>(addr);
        staked_balance.staked_balance
    }

    // ================================= Helper functions ================================== //
    fun get_vault_signer(): signer acquires Vault {
        let vault = borrow_global<Vault>(get_vault_addr());
        object::generate_signer_for_extending(&vault.extend_ref)
    }

    fun is_admin(addr: address): bool {
        addr == @my_addrx
    }

    #[test_only]
    use aptos_framework::account;
    #[test_only]
    use aptos_framework::coin::{BurnCapability, MintCapability};
    #[test_only]
    use aptos_framework::aptos_coin;

    #[test(aptos_framework = @0x1, creator = @my_addrx, alice = @0x3)]
    public entry fun test_staking(aptos_framework: &signer, creator: &signer, alice: &signer) acquires StakedBalance, Vault {
        let (burn_cap, mint_cap) = setup_test(aptos_framework, creator);
        setup_user(alice, &mint_cap);

        // Alice stakes some tokens
        stake(alice, 500);
        
        // Check that Alice's staked balance is correct
        let alice_resource = borrow_global<StakedBalance>(signer::address_of(alice));
        assert!(alice_resource.staked_balance == 500, 100);

        // // Alice unstakes some tokens
        unstake(alice, 200);

        // Check that Alice's staked balance is correct
        let alice_resource = borrow_global<StakedBalance>(signer::address_of(alice));
        assert!(alice_resource.staked_balance == 300, 100);

        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);
    }

    #[test(aptos_framework = @0x1, creator = @my_addrx, alice = @0x3)]
    #[expected_failure(abort_code = EINVALID_UNSTAKE_AMOUNT, location = Self)]
    public entry fun test_block_unstake_limit(aptos_framework: &signer, creator: &signer, alice: &signer) acquires StakedBalance, Vault {
        let (burn_cap, mint_cap) = setup_test(aptos_framework, creator);
        setup_user(alice, &mint_cap);
        // Alice stakes some tokens
        stake(alice, 500);
        
        // Unstake twice up to the limit
        unstake(alice, 400);
        unstake(alice, 100);

        // Unstake more than the limit
        unstake(alice, 100);

        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);
    }

    #[test(aptos_framework = @0x1, creator = @my_addrx, alice = @0x3)]
    public entry fun test_should_allow_multiple_stakes(aptos_framework: &signer, creator: &signer, alice: &signer) acquires StakedBalance {
        let (burn_cap, mint_cap) = setup_test(aptos_framework, creator);
        setup_user(alice, &mint_cap);

        // Alice stakes some tokens
        stake(alice, 500);

        // Alice stakes again
        stake(alice, 100);

        // Check that Alice's staked balance is correct
        let alice_resource = borrow_global<StakedBalance>(signer::address_of(alice));
        assert!(alice_resource.staked_balance == 600, 100);

        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);
    }

    #[test(aptos_framework = @0x1, creator = @my_addrx, alice = @0x3, bob = @0x4)]
    public entry fun test_vote(aptos_framework: &signer, creator: &signer, alice: &signer, bob: &signer) acquires StakedBalance, Vault, VoteRepository {
        let (burn_cap, mint_cap) = setup_test(aptos_framework, creator);
        setup_user(alice, &mint_cap);
        setup_user(bob, &mint_cap);

        // Create a vote
        create_vote(creator, utf8(b"Test Vote"), utf8(b"This is a test vote"), 100, 200);

        // Alice stakes some tokens
        stake(alice, 500);

        // Bob stakes some tokens
        stake(bob, 300);

        timestamp::set_time_has_started_for_testing(aptos_framework);
        timestamp::update_global_time_for_test_secs(100);

        // Alice votes
        vote(alice, 0, 500, true);

        // Bob votes
        vote(bob, 0, 300, false);

        // Alice unstakes some tokens
        unstake(alice, 200);

        timestamp::update_global_time_for_test_secs(200);

        // Declare the winner
        declare_winner(creator, 0);

        // Check that the vote is completed
        let vote_repository = borrow_global<VoteRepository>(@my_addrx);
        let vote = vector::borrow(&vote_repository.votes, 0);
        assert!(vote.completed == true, 100);

        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);
    }

    #[test(aptos_framework = @0x1, creator = @my_addrx, alice = @0x3)]
    #[expected_failure(abort_code = EALREADY_VOTED, location = Self)]
    public entry fun test_can_only_vote_once(aptos_framework: &signer, creator: &signer, alice: &signer) acquires StakedBalance, VoteRepository {
        let (burn_cap, mint_cap) = setup_test(aptos_framework, creator);
        setup_user(alice, &mint_cap);

        timestamp::set_time_has_started_for_testing(aptos_framework);
        timestamp::update_global_time_for_test_secs(100);

        // Create a vote
        create_vote(creator, utf8(b"Test Vote"), utf8(b"This is a test vote"), 100, 200);

        // Alice stakes some tokens
        stake(alice, 500);

        // Alice votes
        vote(alice, 0, 500, true);

        // Alice tries to vote again
        vote(alice, 0, 500, true);

        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);
    }

    #[test_only]
    fun setup_test(aptos_framework: &signer, creator: &signer): (BurnCapability<AptosCoin>, MintCapability<AptosCoin>) {
        let (burn_cap, mint_cap) = aptos_coin::initialize_for_test(aptos_framework);

        init_module(creator);

        (burn_cap, mint_cap)
    }

    #[test_only]
    fun setup_user(user: &signer, mint_cap: &MintCapability<AptosCoin>) {
        account::create_account_for_test(signer::address_of(user));
        coin::register<AptosCoin>(user);
        coin::deposit(signer::address_of(user), coin::mint(1000000, mint_cap));  
    }
}


