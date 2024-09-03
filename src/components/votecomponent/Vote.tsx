// import { ChangeEvent, useState } from "react";
// import Header from "../Header";
// import { IoChevronBackOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";

// const Move = () => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="back">
//         <Link to="/main">
//           {" "}
//           {/* Update the link to point to the main dApp page */}
//           <span className="backicon">
//             <IoChevronBackOutline />
//           </span>
//         </Link>
//       </div>
//       <div className="votequestion">
//         <h4>Proposal / Governance</h4>
//         <h1>Vote Question</h1>
//         <h3>Who Should be Move DAO President</h3>
//       </div>
//       <div className="answer-container">
//         <div className="voteanswer">
//           <form>
//             <section>
//               <label className="custom-radio">
//                 <input
//                   type="radio"
//                   value="yes"
//                   checked={selectedOption === "yes"}
//                   onChange={handleOptionChange}
//                 />
//                 <span className="checkmark"></span>
//                 Russhi
//               </label>
//             </section>
//             <section>
//               <label className="custom-radio">
//                 <input
//                   type="radio"
//                   value="no"
//                   checked={selectedOption === "no"}
//                   onChange={handleOptionChange}
//                 />
//                 <span className="checkmark"></span>
//                 Coop
//               </label>
//             </section>
//             <button className="votebtn">VOTE</button>
//           </form>
//         </div>
//         <div className="votedescription">
//           <p>
//             General Voting Rules One Person, One Vote: Each eligible voter
//             should be allowed to cast only one vote. Eligibility Verification:
//             Ensure that only eligible voters (those who meet predefined criteria
//             such as age, residency, etc.) can participate in the voting process.
//             Confidentiality: Voting should be confidential to protect voter
//             privacy and prevent undue influence. Transparency: The voting
//             process should be transparent to build trust. This includes clear
//             instructions, open counting processes, and accessible records.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Move;
// import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
// import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import Header from "../Header";
import { useRef, useState, useEffect } from "react";
import { InputTransactionData } from '@aptos-labs/ts-sdk';
import { DVOTING } from "./constants";
import movementClient from "../../services/movement-client";
import { useAptosWallet } from "@razorlabs/wallet-kit";

function App() {
  const { account, signTransaction } = useAptosWallet(); // Using Aptos wallet methods
  const name = useRef<HTMLInputElement>(null);
  const bio = useRef<HTMLTextAreaElement>(null);

  const [accountHasBio, setAccountHasBio] = useState(false);
  const [currentName, setCurrentName] = useState<string[]>([]);
  const [currentBio, setCurrentBio] = useState<string | null>(null);

  const fetchBio = async () => {
    if (!account) {
      console.log("No account");
      return;
    }

    try {
      const candidateList = await movementClient.getAccountResource({
        accountAddress: account.address,
        resourceType: `${DVOTING}::Voting1::CandidateList`,
      });

      if (candidateList) {
        console.log("Candidate List", candidateList.c_list, "Winner:", candidateList.winner);
        setAccountHasBio(true);
        setCurrentName(candidateList.cadnidate_list || []);
        setCurrentBio(candidateList.winner || null);
      } else {
        console.log("No bio");
        setAccountHasBio(false);
      }
    } catch (e: any) {
      console.error("Error fetching bio:", e);
      setAccountHasBio(false);
    }
  };

  const submitTransaction = async (transaction: InputTransactionData) => {
    try {
      if (!signTransaction) {
        throw new Error("signTransaction method is not available.");
      }
      const signedTransaction = await signTransaction(transaction);
      const response = await movementClient.submitTransaction(signedTransaction);
      console.log(`Success! View your transaction at https://explorer.aptoslabs.com/txn/${response.hash}`);
      await movementClient.waitForTransaction({ transactionHash: response.hash });
      fetchBio();
    } catch (error: any) {
      console.log("Error:", error);
    }
  };

  const initializeVote = () => {
    const transaction: InputTransactionData = {
      data: {
        function: `${DVOTING}::Voting1::initialize_with_candidate`,
        functionArguments: ["0x2fb80d5bdeb1c2ae6d339d2f526916c6109d0ad1d8acdab018e2441ce80b6b89"],
      },
    };
    submitTransaction(transaction);
  };

  const addCandidate = () => {
    const transaction: InputTransactionData = {
      data: {
        function: `${DVOTING}::Voting1::add_candidate`,
        functionArguments: ["0xf57759cb6b0522dc4f8f60d9934fab3a98dae9ffadab79a0f5934ee3469f465f"],
      },
    };
    submitTransaction(transaction);
  };

  const vote = () => {
    const transaction: InputTransactionData = {
      data: {
        function: `${DVOTING}::Voting1::vote`,
        functionArguments: [
          "0xf57759cb6b0522dc4f8f60d9934fab3a98dae9ffadab79a0f5934ee3469f465f", 
          "0x4c1081ce9b88b1ecf27142452f32174eadc0c7aaa07b5cf639f1ec62c1f09843"
        ],
      },
    };
    submitTransaction(transaction);
  };

  const declareWinner = () => {
    const transaction: InputTransactionData = {
      data: {
        function: `${DVOTING}::Voting1::declare_winner`,
        functionArguments: [],
      },
    };
    submitTransaction(transaction);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-text">Your Voting dApp</div>
        <div>
          <Header />
        </div>
      </div>
      <div className="center-container">
        <div className="row">
          <h1>Your Voting dApp</h1>
        </div>

        <div className="row">
          <button onClick={initializeVote}>Initialize Vote</button>
        </div>

        <div className="row">
          <button onClick={addCandidate}>Add Candidate</button>
        </div>

        <div className="row">
          <button onClick={vote}>Vote</button>
        </div>

        <div className="row">
          <button onClick={declareWinner}>Declare Winner</button>
        </div>

        <div className="row">
          <center>
            <h3>Candidates:</h3>
            <ul>
              {currentName?.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
            <h3>Winner:</h3>
            <p>{currentBio}</p>
          </center>
        </div>
      </div>
    </>
  );
}

export default App;
