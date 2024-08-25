import { FaWallet } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import "@razorlabs/wallet-kit/style.css";
import { AptosConnectButton } from "@razorlabs/wallet-kit";
import { useAptosWallet } from "@razorlabs/wallet-kit";
import { useStake } from "./useStake";
import { MODULE_ADDRESS } from "../constants";
import { useRef } from "react";

const Votedata = () => {
  const { data: stake, refetch: refetchStake } = useStake();
  const { account, signAndSubmitTransaction } = useAptosWallet();
  const amountRef = useRef<HTMLInputElement>(null);

  async function stakeMove() {
    const amount = parseFloat(amountRef.current?.value || "0");

    await signAndSubmitTransaction({
      payload: {
        function: `${MODULE_ADDRESS}::Staking::stake`,
        functionArguments: [(amount * Math.pow(10, 8)).toString()],
      },
    });

    setTimeout(() => refetchStake(), 5000);
  }

  async function unstakeMove() {
    const amount = parseFloat(amountRef.current?.value || "0");

    await signAndSubmitTransaction({
      payload: {
        function: `${MODULE_ADDRESS}::Staking::unstake`,
        functionArguments: [(amount * Math.pow(10, 8)).toString()],
      },
    });

    setTimeout(() => refetchStake(), 5000);
  }

  return (
    <div className="vdata-container">
      <div className="vdata-info-one">
        <div className="vote-power">
          <p>Staked: {stake}</p>
          <span>
            <ImPower />
          </span>
        </div>
        <h3>Lock MOVE tokens to receive your voting power. Learn more</h3>
      </div>

      <div className="vdata-info">
        <div className="vdata-wallet-action">
          <p>Amount</p>
          <div className="vdata-wallet-action-flex">
            <p>
              <FaWallet />
              <span>1</span> MOVE
            </p>
          </div>
        </div>
        <h3>
          Connect your wallet below to lock MOVE and vote on Proposals & LFG!
        </h3>
        <input className="inputfield" placeholder="MOVE" ref={amountRef} />
        {/* {!account?.address && <AptosConnectButton className="whit" />} */}
        {!account?.address && (
          <AptosConnectButton
            className="whit"
            style={{
              margin: "0",
              width: "400px",
              padding: "13px 2px",
              backgroundColor: "#443300",
              color: "#fff",
              borderRadius: "13px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          />
        )}
        {account?.address && (
          <>
            <button type="button" className="after-connect" onClick={() => stakeMove()}>
              Stake
            </button>
            <button type="button" className="after-connect" onClick={() => unstakeMove()}>
              Unstake
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Votedata;
