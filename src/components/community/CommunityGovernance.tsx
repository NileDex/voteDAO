import React from "react";
import "./css/CommunityGovernance.css";

const SimpleCard: React.FC = () => {
  const proposals = [
    {
      id: 1,
      title: "Proposal 1",
      description: "Increase validator rewards.",
      progress: 80,
    },
    {
      id: 2,
      title: "Proposal 2",
      description: "Lower transaction fees.",
      progress: 40,
    },
    {
      id: 3,
      title: "Proposal 3",
      description: "Fund ecosystem projects.",
      progress: 60,
    },
  ];

  return (
    <div className="simple-card-container">
      {proposals.map((proposal) => (
        <div key={proposal.id} className="card">
          <h3 className="card-title">{proposal.title}</h3>
          <p className="card-description">{proposal.description}</p>
          <div className="card-progress">
            <div
              className="progress-bar"
              style={{ width: `${proposal.progress}%` }}
            ></div>
          </div>
          <p className="progress-text">{proposal.progress}% completed</p>
        </div>
      ))}
    </div>
  );
};

export default SimpleCard;
