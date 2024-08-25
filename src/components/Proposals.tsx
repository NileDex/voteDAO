import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Proposals = () => {
  const [filter, setFilter] = useState("");

  const proposals = [
    {
      id: 1,
      topic: "Who Should be MoveDAO President",
      start: "06/07",
      end: "10/07",
      project: "Movement",
      status: "Pending",
      link: "../vote",
    },
    {
      id: 2,
      topic: "Proposal for New Tokenomics",
      start: "08/07",
      end: "12/07",
      project: "Tokenomics",
      status: "Approved",
      link: "/vote2",
    },
    {
      id: 3,
      topic: "Proposal for New Movement, Youtube Show",
      start: "08/07",
      end: "12/07",
      project: "Social",
      status: "Approved",
      link: "/vote3",
    },
    // Add more proposals here
  ];

  const filteredProposals = proposals.filter((proposal) =>
    proposal.topic.toLowerCase().includes(filter.toLowerCase())
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
              <th>Project</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProposals.map((proposal) => (
              <tr key={proposal.id}>
                <td className="link">
                  {proposal.id}.
                </td>
                <td>
                  {proposal.topic}
                </td>
                <td>
                  <button className="prior-plan">
                    <Link to={proposal.link}>
                      <p>Vote Here</p>
                    </Link>
                  </button>
                </td>
                <td>{proposal.start}</td>
                <td>{proposal.end}</td>
                <td>{proposal.project}</td>
                <td>{proposal.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proposals;
