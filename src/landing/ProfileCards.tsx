import React from 'react';
import './Card.css'; // Import the CSS file

interface CardProps {
  profileImg: string;
  username: string;
  description: string;
  followers: number;
  following: number;
  power: string;
}

const Card: React.FC<CardProps> = ({ profileImg, username, description, followers, following, power }) => {
  return (
    <div className="card">
      <img src={profileImg} alt={`${username}'s profile`} className="profile-img" />
      <h3 className="username">{username}</h3>
      <p className="description">{description}</p>
      <div className="stats">
        <div className="stat"><strong>{followers}</strong> Followers</div>
        <div className="stat"><strong>{following}</strong> Following</div>
        <div className="stat"><strong>{power}</strong> Power</div>
      </div>
    </div>
  );
};

export default Card;
