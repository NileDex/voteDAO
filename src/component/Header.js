import React, { useState } from 'react';
import logo from './images/logo.png';
import { IoSettingsOutline } from "react-icons/io5";
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header">
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
        <button className='connect-btn'>Connect Wallet</button>
      </div>
    </div>
  );
};

export default Header;
