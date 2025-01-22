import { ChangeEvent, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { createEntryPayload } from "@thalalabs/surf";
import { ABI as StakingABI } from "../../services/Staking.ts";
import { useAptosWallet } from "@razorlabs/wallet-kit";
import { useStake } from "../useStake";
import { MODULE_ADDRESS } from "../../constants.ts";

const Vote = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { signAndSubmitTransaction, address } = useAptosWallet();
  const { data: stake } = useStake();

  if (!stake) return null;

  function dateToSeconds(date: Date) {
    const dateInSeconds = Math.floor(+date / 1000);
    return dateInSeconds;
  }

  // Only admin can create a vote
  const createVote = async () => {
    const payload = createEntryPayload(StakingABI, {
      function: "create_vote",
      typeArguments: [],
      functionArguments: [
        "Vote Question 1",
        "Vote Description 1",
        dateToSeconds(new Date(2024, 1, 1)),
        dateToSeconds(new Date(2025, 1, 1)),
      ],
    });

    await signAndSubmitTransaction({
      payload,
    });
  };

  const vote = async (yes: boolean) => {
    const voteId = 1;
    const payload = createEntryPayload(StakingABI, {
      function: "vote",
      typeArguments: [],
      functionArguments: [voteId, (stake * Math.pow(10, 8)).toString(), yes],
    });

    await signAndSubmitTransaction({
      payload,
    });
  };

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="back">
        <Link to="/main">
          {" "}
          {/* Update the link to point to the main dApp page */}
          <span className="backicon">
            <IoChevronBackOutline />
          </span>
        </Link>
      </div>
      <div className="votequestion">
        <h4>Proposal / Governance</h4>
        <h1>Vote Question</h1>
        <h3>Who Should be Move DAO President</h3>
      </div>
      <div className="answer-container">
        <div className="voteanswer">
          <form>
            <section>
              <label className="custom-radio">
                <input
                  type="radio"
                  value="yes"
                  checked={selectedOption === "yes"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
                Russhi
              </label>
            </section>
            <section>
              <label className="custom-radio">
                <input
                  type="radio"
                  value="no"
                  checked={selectedOption === "no"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
                Coop
              </label>
            </section>
            {address === "0x" + MODULE_ADDRESS && (
              <button className="votebtn" type="button" onClick={createVote}>
                Create Vote
              </button>
            )}
            <button
              className="votebtn"
              type="button"
              onClick={() => vote(true)}
            >
              Vote yes
            </button>
            <button
              className="votebtn"
              type="button"
              onClick={() => vote(false)}
            >
              Vote no
            </button>
          </form>
        </div>
        <div className="votedescription">
          <p>
            General Voting Rules One Person, One Vote: Each eligible voter
            should be allowed to cast only one vote. Eligibility Verification:
            Ensure that only eligible voters (those who meet predefined criteria
            such as age, residency, etc.) can participate in the voting process.
            Confidentiality: Voting should be confidential to protect voter
            privacy and prevent undue influence. Transparency: The voting
            process should be transparent to build trust. This includes clear
            instructions, open counting processes, and accessible records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vote;
