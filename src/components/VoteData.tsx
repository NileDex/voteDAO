import { FaWallet } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import "@razorlabs/wallet-kit/style.css";
import { AptosConnectButton } from "@razorlabs/wallet-kit";
import { useAptosWallet } from "@razorlabs/wallet-kit";

const Votedata = () => {
  const wallet = useAptosWallet();
  console.log(wallet.address);

  return (
    <div className="vdata-container">
      <div className="vdata-info-one">
        <div className="vote-power">
          <p>1000 </p>
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
            <h6>Max</h6>
            <h6>Half</h6>
          </div>
        </div>
        <h3>
          Connect your wallet below to lock MOVE and vote on Proposals & LFG!
        </h3>
        <input className="inputfield" placeholder="MOVE" value={0} />
        <AptosConnectButton className="whit" />
      </div>
    </div>
  );
};

export default Votedata;
