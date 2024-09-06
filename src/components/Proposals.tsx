import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useVotes } from "./useVotes";

const Proposals = () => {
  const [filter, setFilter] = useState("");
  const { data: votes } = useVotes();

  if (!votes) return null;

  const filteredProposals = votes.filter((proposal) =>
    proposal.title.toLowerCase().includes(filter.toLowerCase())
  );

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
                <td>{proposal.start_time}</td>
                <td>{proposal.end_time}</td>
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
