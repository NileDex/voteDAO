// import { useState } from "react";
// import "../App.css";
// import { Link } from "react-router-dom";
// import { useVotes } from "./useVotes";

// const Proposals = () => {
//   const [filter, setFilter] = useState<string>("");
//   const { data: votes } = useVotes();

//   if (!votes) return null;

//   const filteredProposals = votes.filter((proposal) =>
//     proposal.title.toLowerCase().includes(filter.toLowerCase())
//   );

//   const formatDate = (timestamp: number): string => {
//     const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="proposal">
//       <div className="proposal-filter">
//         <h3>Proposals</h3>
//         <form>
//           <input
//             type="text"
//             placeholder="Search"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           />
//         </form>
//       </div>

//       <div className="proposal-container">
//         <table className="styled-table">
//           <thead>
//             <tr>
//               <th>id</th>
//               <th>Topic</th>
//               <th></th>
//               <th>Start</th>
//               <th>End</th>
//               <th>Yes Votes</th>
//               <th>No Votes</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProposals.map((proposal) => (
//               <tr key={proposal.id}>
//                 <td className="link">{proposal.id}.</td>
//                 <td>{proposal.title}</td>
//                 <td>
//                   <button className="prior-plan">
//                     <Link to={`/vote?id=${proposal.id}`}>
//                       <p>Vote Here</p>
//                     </Link>
//                   </button>
//                 </td>
//                 <td>{proposal.start_time ? formatDate(Number(proposal.start_time)) : "N/A"}</td>
//                 <td>{proposal.end_time ? formatDate(Number(proposal.end_time)) : "N/A"}</td>
//                 <td>
//                   {parseInt(proposal.total_yes_votes) / Math.pow(10, 8)} MOVE
//                 </td>
//                 <td>
//                   {parseInt(proposal.total_no_votes) / Math.pow(10, 8)} MOVE
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Proposals;

import { useState } from "react";
import "./css/proposal.css";
import { Link } from "react-router-dom";
import { useVotes } from "./useVotes";
import { IoCloudOfflineOutline } from "react-icons/io5"; // Offline icon

const Proposals = () => {
  const [filter, setFilter] = useState<string>("");

  // Get votes and account information
  const { data: votes } = useVotes();
  const isConnected = votes !== undefined && votes.length > 0; // Check if connected by ensuring data exists

  // Show offline icon and message if the wallet is not connected
  if (!isConnected) {
    return (
      <div className="offline-container">
        <IoCloudOfflineOutline size={80} color="#6c757d" />
        <p>Your wallet is not connected. Please connect your wallet to view proposals.</p>
      </div>
    );
  }

  // Show offline icon and message if no votes are retrieved
  if (!votes || votes.length === 0) {
    return (
      <div className="offline-container">
        <IoCloudOfflineOutline size={80} color="#6c757d" />
        <p>No votes found on the blockchain. Please check your connection or try again later.</p>
      </div>
    );
  }

  // Filter proposals based on user input
  const filteredProposals = votes.filter((proposal) =>
    proposal.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Format timestamps for display
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="proposal">
      <div className="proposal-filter">
        <h3>Proposals</h3>
        <form>
          <input
            type="text"
            placeholder="Search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </form>
      </div>

      <div className="proposal-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Topic</th>
              <th></th>
              <th>Start</th>
              <th>End</th>
              <th>Yes Votes</th>
              <th>No Votes</th>
            </tr>
          </thead>
          <tbody>
            {filteredProposals.map((proposal) => (
              <tr key={proposal.id}>
                <td className="link">{proposal.id}.</td>
                <td>{proposal.title}</td>
                <td>
                  <button className="prior-plan">
                    <Link to={`/vote?id=${proposal.id}`}>
                      <p>Vote Here</p>
                    </Link>
                  </button>
                </td>
                <td>{proposal.start_time ? formatDate(Number(proposal.start_time)) : "N/A"}</td>
                <td>{proposal.end_time ? formatDate(Number(proposal.end_time)) : "N/A"}</td>
                <td>
                  {parseInt(proposal.total_yes_votes) / Math.pow(10, 8)} MOVE
                </td>
                <td>
                  {parseInt(proposal.total_no_votes) / Math.pow(10, 8)} MOVE
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proposals;
