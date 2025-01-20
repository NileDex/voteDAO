// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import favicon from "../../public/images/favicon.png";
// import { IoSettingsOutline } from "react-icons/io5";
// import ThemeToggle from "./ThemeToggle";
// import { AptosConnectButton } from "@razorlabs/wallet-kit";
// import "./css/header.css";

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isHidden, setIsHidden] = useState(false);
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   let lastScrollY = 0;

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const toggleNav = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   const handleScroll = () => {
//     const currentScrollY = window.scrollY;

//     if (currentScrollY > lastScrollY && currentScrollY > 100) {
//       setIsHidden(true);
//     } else {
//       setIsHidden(false);
//     }

//     lastScrollY = currentScrollY;
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className={`header ${isHidden ? "hidden" : ""}`}>
//       <div className="logo-section">
//         <div className="logo">
//           <img src={favicon} alt="logo" />
//           <img className="mobile-logo" src={favicon} alt="mobile logo" />
//         </div>
//         <div className="logo-info">
//           <p className="governance-text">Governance</p>
//           <div className="testnet-block">Testnet</div>
//         </div>
//       </div>

//       {/* Hamburger Menu */}
//       <div className="hamburger" onClick={toggleNav}>
//         <div />
//         <div />
//         <div />
//       </div>

//       <nav className={`nav-items ${isNavOpen ? "show" : ""}`}>
//         <Link to="/" className="nav-link">
//           Home
//         </Link>
//         <Link to="/profile" className="nav-link">
//           Profile
//         </Link>
//         <Link to="/analytics" className="nav-link">
//           Analytics
//         </Link>
//         <Link to="/CommunityGovernance" className="nav-link">
//           Community
//         </Link>
//       </nav>

//       <div className="headerspecial">
//         <p className="prior">Priority: Fast</p>
//         <section className="dropdown-container">
//           <button onClick={toggleDropdown} className="set">
//             <IoSettingsOutline />
//           </button>
//           {isDropdownOpen && (
//             <div className="dropdown-menu">
//               <a href="#option1">Settings</a>
//               <ThemeToggle />
//             </div>
//           )}
//         </section>
//         <AptosConnectButton className="whit" />
//       </div>
//     </div>
//   );
// };

// export default Header;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import favicon from "../../public/images/favicon.png";
import { IoSettingsOutline } from "react-icons/io5";
import ThemeToggle from "./ThemeToggle";
import { AptosConnectButton } from "@razorlabs/wallet-kit";
import "./css/header.css";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  let lastScrollY = 0;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    lastScrollY = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`header ${isHidden ? "hidden" : ""}`}>
      <div className="logo-section">
        <div className="logo">
          <img src={favicon} alt="logo" />
          <img className="mobile-logo" src={favicon} alt="mobile logo" />
        </div>
        <div className="logo-info">
          <p className="governance-text">Governance</p>
          <div className="testnet-block">Testnet</div>
        </div>
      </div>

      <div className="hamburger" onClick={toggleNav}>
        <div />
        <div />
        <div />
      </div>

      <nav className={`nav-items ${isNavOpen ? "show" : ""}`}>
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/profile" 
          className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          Profile
        </Link>
        <Link 
          to="/analytics" 
          className={`nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}
        >
          Analytics
        </Link>
        <Link 
          to="/CommunityGovernance" 
          className={`nav-link ${location.pathname === '/CommunityGovernance' ? 'active' : ''}`}
        >
          Community
        </Link>
      </nav>

      <div className="headerspecial">
        <p className="prior">Priority: Fast</p>
        <section className="dropdown-container">
          <button onClick={toggleDropdown} className="set">
            <IoSettingsOutline />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="#option1">Settings</a>
              <ThemeToggle />
            </div>
          )}
        </section>
        <AptosConnectButton className="whit" />
      </div>
    </div>
  );
};

export default Header;