import { FaWallet } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import "@razorlabs/wallet-kit/style.css";
import { AptosConnectButton } from "@razorlabs/wallet-kit";
import { useAptosWallet } from "@razorlabs/wallet-kit";
import { useStake } from "./useStake";
import { useRef, useState } from "react";
import { createEntryPayload } from "@thalalabs/surf";
import { ABI as StakingABI } from "../services/Staking.ts";
import Modal from "./Modal"; // Import the Modal component

const Votedata = () => {
  const { data: stake, refetch: refetchStake } = useStake();
  const { account, signAndSubmitTransaction } = useAptosWallet();
  const amountRef = useRef<HTMLInputElement>(null);

  // State for controlling modal visibility and message
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Function to open modal with a specific message
  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function stakeMove() {
    const amount = parseFloat(amountRef.current?.value || "0");

    const payload = createEntryPayload(StakingABI, {
      function: "stake",
      typeArguments: [],
      functionArguments: [(amount * Math.pow(10, 8)).toString()],
    });

    openModal("Staking in progress...");
    await signAndSubmitTransaction({
      payload,
    });
    openModal("Staked successfully!");

    setTimeout(() => {
      refetchStake();
      closeModal();
    }, 5000);
  }

  async function unstakeMove() {
    const amount = parseFloat(amountRef.current?.value || "0");

    openModal("Unstaking in progress...");
    await signAndSubmitTransaction({
      payload: createEntryPayload(StakingABI, {
        function: `unstake`,
        typeArguments: [],
        functionArguments: [(amount * Math.pow(10, 8)).toString()],
      }),
    });
    openModal("Unstaked successfully!");

    setTimeout(() => {
      refetchStake();
      closeModal();
    }, 5000);
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
        <h3>
          Lock MOVE tokens to receive your voting power.{" "}
          <a href="https://movedao-1.gitbook.io/movedao/">Learn more</a>
        </h3>
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
        {!account?.address && (
          <AptosConnectButton
            className="whit"
            style={{
              margin: "0",
              width: "100%", // Makes the button take full width of its container
              maxWidth: "400px", // Limits the maximum width to 400px
              padding: "10px 5px", // Adjusted padding for responsiveness
              backgroundColor: "#443300",
              color: "#fff",
              borderRadius: "13px",
              fontSize: "15px", // Base font size
              fontWeight: "bold",
              boxSizing: "border-box", // Ensures padding and border are included in the total width and height
            }}
          />
        )}
        {account?.address && (
          // <>
          //   <button type="button" className="after-connect" onClick={stakeMove}>
          //     Stake
          //   </button>
          //   <button type="button" className="after-connect" onClick={unstakeMove}>
          //     Unstake
          //   </button>
          // </>
          <>
            <button
              type="button"
              style={{
                width: "100%",
                padding: "10px 2px",
                backgroundColor: "#430",
                color: "#fff",
                borderRadius: "13px",
                fontSize: "15px",
                fontWeight: "700",
                border: "none",
                margin: "2px 0",
              }}
              onClick={stakeMove}
            >
              Stake
            </button>
            <button
              type="button"
              style={{
                width: "100%",
                padding: "10px 2px",
                backgroundColor: "#430",
                color: "#fff",
                borderRadius: "13px",
                fontSize: "15px",
                fontWeight: "700",
                border: "none",
                margin: "2px 0",
              }}
              onClick={unstakeMove}
            >
              Unstake
            </button>
          </>
        )}
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalMessage}
      </Modal>
    </div>
  );
};

export default Votedata;
