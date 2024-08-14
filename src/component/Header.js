// import React, { useState } from 'react';
// import logo from './images/logo.png';
// import { IoSettingsOutline } from "react-icons/io5";
// import ThemeToggle from './ThemeToggle';
// import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

// import { Layout, Row, Col } from "antd";

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className="header">
//       <div className='logo'>
//         <img src={logo} alt="logo" />
//       </div>
//       <div className="headerspecial">
//         <p className='prior'>Priority: Fast</p>
//         <section className='dropdown-container'>
//           <button onClick={toggleDropdown} className='set'>
//             <IoSettingsOutline />
//           </button>
//           {isDropdownOpen && (
//             <div className="dropdown-menu">
//               <a href="#option1">Settings</a>
//               <ThemeToggle />
//             </div>
//           )}
//         </section>
//         {/* <button className='connect-btn'>Connect Wallet</button> */}
        
//           <WalletSelector className='connect-btn' />
        
//       </div>
//     </div>
//   );
// };

// export default Header;
import React, { useState, useEffect } from 'react';
import logo from './images/logo.png';
import { IoSettingsOutline } from "react-icons/io5";
import ThemeToggle from './ThemeToggle';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";



const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  let lastScrollY = 0;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
      <div className='logo'>
        <img src={logo} alt="logo" />
      </div>
      <div className="headerspecial">
        <p className='prior'>Priority: Fast</p>
        <section className='dropdown-container'>
          <button onClick={toggleDropdown} className='set'>
            <IoSettingsOutline />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="#option1">Settings</a>
              <ThemeToggle />
            </div>
          )}
        </section>
        <WalletSelector className='connect-btn' />
      </div>
    </div>
  );
};

export default Header;
