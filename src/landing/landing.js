import React from "react";

import { Link } from "react-router-dom";
import AnimatedElement from "./animation";
import "./landingnavbar.css";
import logo from "../component/images/logo.png";
import movement from "../component/images/movement.png";
import CardsContainer from "./Cardcontainer";
import Footer from "../component/footer";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img className="sublogo" src={logo} alt="logo" />
        </div>
        <Link to="/main">
          <p className="enter">Launch DApp</p>
        </Link>
      </div>

      <div>
        <AnimatedElement />
      </div>
      <div className="subsection">
        <div className="sectiontextmain">
          <img className="sublogo" src={movement} alt="logo" />
          <p className="sectiontext">Powered by Movement</p>
          <p>
            At <span>MoveDAO</span>, we believe in the power of collective
            decision-making. Our platform is designed to enable transparent,
            secure, and efficient voting processes, giving every stakeholder a
            voice in the governance of decentralized organizations. Whether
            you're a part of a DAO, a blockchain-based project, or any other
            decentralized entity, <span>MoveDAO</span> is here to facilitate
            your voting needs with cutting-edge technology.
          </p>
        </div>
        <div>
          <img
            className="votinglogo"
            src="https://www.billboard.com/wp-content/uploads/2024/06/vote-badge-illo-billboard-1548.jpg?w=942&h=623&crop=1"
          />
        </div>
      </div>
      <div className="subsection2">
       <CardsContainer/>
      </div>
      <Footer/>
    </nav>
  );
};

export default Navbar;
