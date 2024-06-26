// import React, { useState } from "react";
// import Header from "../Header";
// import { IoChevronBackOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";

// const Move = () => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="back">
//         <Link to="/">
//           <span className="backicon">
//             <IoChevronBackOutline />
//           </span>
//         </Link>
//       </div>
//       <div className="votequestion">
//         <h4>Proposal / Governance</h4>
//         <h1>Vote Question</h1>
//         <h3>Create Move Token</h3>
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
//                 Yes, 
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
//                 No, 
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
import React, { useState } from "react";
import Header from "../Header";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useWallet, InputTransactionData } from '@aptos-labs/wallet-adapter-react';
import { Aptos } from "@aptos-labs/ts-sdk";
import { DVOTING } from "./constants"; // Ensure this path is correct

const Move = () => {
  const { signAndSubmitTransaction } = useWallet();
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const aptos = new Aptos();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setError(""); // Clear error when option changes
  };

  const handleVoteClick = async (event) => {
    event.preventDefault();
    if (!selectedOption) {
      setError("Please select an option to vote.");
      return;
    }
    setLoading(true);

    try {
      await vote(selectedOption);
      // Handle success, show alert message or navigate to success page
      alert("Vote successful!"); // Replace with your desired success handling
      setSelectedOption(""); // Clear selected option after voting
    } catch (error) {
      console.error("Error voting:", error);
      setError("Error voting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const vote = async (option) => {
    const candidateId = "0..."; // Replace with the actual candidate ID or proposal ID

    const transaction: InputTransactionData = {
      data: {
        function: `${DVOTING}::Voting1::vote`,
        functionArguments: [option, candidateId]
      }
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      console.log(`Success! View your transaction at https://explorer.aptoslabs.com/txn/${response.hash}`);
      await aptos.waitForTransaction({ transactionHash: response.hash });
    } catch (error) {
      console.error("Error voting:", error);
      throw error;
    }
  };

  return (
    <div>
      <Header />
      <div className="back">
        <Link to="/">
          <span className="backicon">
            <IoChevronBackOutline />
          </span>
        </Link>
      </div>
      <div className="votequestion">
        <h4>Proposal / Governance</h4>
        <h1>Vote Question</h1>
        <h3>Create Move Token</h3>
      </div>
      <div className="answer-container">
        <div className="voteanswer">
          <form onSubmit={handleVoteClick}>
            <section>
              <label className="custom-radio">
                <input
                  type="radio"
                  value="yes"
                  checked={selectedOption === "yes"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
                Yes
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
                No
              </label>
            </section>
            <button className="votebtn" disabled={loading}>
              {loading ? "Voting..." : "VOTE"}
            </button>
            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>
        <div className="votedescription">
          <p>
            General Voting Rules: One Person, One Vote. Eligibility Verification:
            Ensure only eligible voters can participate. Confidentiality: Voting is private
            to protect privacy. Transparency: Ensure transparent voting process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Move;
