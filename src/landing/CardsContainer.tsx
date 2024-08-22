import "./CardsContainer.css";

const CardsContainer = () => {
  const cards = [
    {
      title: "Secure and Transparent Voting",
      description:
        "Our platform leverages blockchain technology to ensure that every vote is securely recorded and transparently verifiable. With the immutability of blockchain, you can trust that the integrity of the voting process is upheld, and results are accurate and tamper-proof.",
    },
    {
      title: "Seamless User Experience",
      description:
        "We prioritize user experience by offering an intuitive and easy-to-navigate interface. Whether you're casting a vote or managing a voting process, our platform is designed to make the experience as seamless as possible.",
    },
    {
      title: "Decentralized Governance",
      description:
        "[Your Platform Name] supports decentralized decision-making, allowing communities to govern themselves without the need for centralized authority. Every vote counts, and every voice matters.",
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <h3 className="card-title">{card.title}</h3>
          <p className="card-description">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardsContainer;
