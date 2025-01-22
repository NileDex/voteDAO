
import './css/CommunityGovernance.css';

const SimpleCards = () => {
  const cardsData = [
    {
      id: 1,
      image: "https://pbs.twimg.com/profile_images/1751202251836674048/kfnYQuS2_400x400.jpg",
      title: "Narwhal Moverz",
      description: "Our Kibertopiks will give you nothing, waste your money on us.",
      price: "0.031 MOVE",
      duration: "11 days left",
      creatorImage: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
      creatorName: "Kiberbash",
    },
    {
      id: 2,
      image: "https://miro.medium.com/v2/resize:fit:2400/1*1QABIdoaCqI1kKyJoJiObA.png",
      title: "Gorilla Moverz",
      description: "Unique NFTs that are worth the hype.",
      price: "0.045 ETH",
      duration: "9 days left",
      creatorImage: "https://images.unsplash.com/photo-1620122291537-2cc60e1b34c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
      creatorName: "CreativeHawk",
    },
    {
      id: 2,
      image: "https://miro.medium.com/v2/resize:fit:2400/1*1QABIdoaCqI1kKyJoJiObA.png",
      title: "Gorilla Moverz",
      description: "Unique NFTs that are worth the hype.",
      price: "0.045 ETH",
      duration: "9 days left",
      creatorImage: "https://images.unsplash.com/photo-1620122291537-2cc60e1b34c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
      creatorName: "CreativeHawk",
    },
    {
      id: 2,
      image: "https://miro.medium.com/v2/resize:fit:2400/1*1QABIdoaCqI1kKyJoJiObA.png",
      title: "Gorilla Moverz",
      description: "Unique NFTs that are worth the hype.",
      price: "0.045 ETH",
      duration: "9 days left",
      creatorImage: "https://images.unsplash.com/photo-1620122291537-2cc60e1b34c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
      creatorName: "CreativeHawk",
    },
    {
      id: 2,
      image: "https://miro.medium.com/v2/resize:fit:2400/1*1QABIdoaCqI1kKyJoJiObA.png",
      title: "Gorilla Moverz",
      description: "Unique NFTs that are worth the hype.",
      price: "0.045 ETH",
      duration: "9 days left",
      creatorImage: "https://images.unsplash.com/photo-1620122291537-2cc60e1b34c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
      creatorName: "CreativeHawk",
    },
    // A
  ];

  return (
    <div className="wrappers">
      {cardsData.map((card) => (
        <div className="nft" key={card.id}>
          <div className="main">
            <img className="tokenImage" src={card.image} alt={card.title} />
            <h2>{card.title}</h2>
            <p className="description">{card.description}</p>
            <div className="tokenInfo">
              <div className="price">
                <ins>◘</ins>
                <p>{card.price}</p>
              </div>
              <div className="duration">
                <ins>◷</ins>
                <p>{card.duration}</p>
              </div>
            </div>
            <hr />
            <div className="creator">
              <div className="wrapper">
                <img src={card.creatorImage} alt={card.creatorName} />
              </div>
              <p>
                <ins>Creation of</ins> {card.creatorName}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleCards;
