import { Link } from "react-router-dom";
import AnimatedElement from "./AnimatedElement";
import "./Navbar.css";
import logo from "../components/images/logo.png";
import movement from "../components/images/movement.png";
import Footer from "../components/Footer";
import Card from "./ProfileCards";
import { GrStakeholder } from "react-icons/gr";
import { FaArrowRight } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import { ImPower } from "react-icons/im";

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
            alt="voting"
            className="votinglogo"
            src="https://www.billboard.com/wp-content/uploads/2024/06/vote-badge-illo-billboard-1548.jpg?w=942&h=623&crop=1"
          />
        </div>
      </div>

      <div className="offer">
        <p>What we Offer</p>
        <ol>
          <li>
            Explore Our Vision: Dive into our mission and see how we’re shaping
            the future of blockchain governance.
          </li>
          <li>
            Participate: Engage in discussions, vote on proposals, and help
            steer the direction of our projects.
          </li>
          <li>
            Build Together: Collaborate with other members, contribute to
            development, and create impactful solutions.
          </li>
        </ol>
        <div className="natureicons">
          <GrStakeholder className="natureicons1" />
          <FaArrowRight className="natureicons2" />
          <ImPower className="natureicons1" />
          <FaArrowRight className="natureicons2" />
          <MdHowToVote className="natureicons1" />
          <div>
            <p>Stake</p>
            <p>Power</p>
            <p>Vote</p>
          </div>
        </div>
      </div>

      <div className="carddd">
        <div className="meet-the-team">
          <p>Meet The Team</p>
        </div>
        <div className="cardd">
          <Card
            profileImg="https://pbs.twimg.com/profile_images/1818184363688800256/Cp6wpmkK_400x400.jpg"
            username="Integrated | Nile_Dex | Movement"
            description="Nft collection Creator/Designer, Learning to code.🍌🦍"
            CO-FOUNDER={true}
            followers={200}
            following={180}
            power="320 Power"
          />
          <Card
            profileImg="https://pbs.twimg.com/profile_images/1825500712727429120/1ZMyBV0L_400x400.jpg"
            username="Urs Lee | INTEGRATED 🦍⚡"
            description="@ursleee Dev | @GorillaMoverz and @movementlabsxyz Apes together strong! 🍌🦍"
            CO-FOUNDER={true}
            followers={150}
            following={180}
            power="320 Power"
          />
        </div>
      </div>

      <Footer />
    </nav>
  );
};

export default Navbar;
