// src/ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { CiLight } from "react-icons/ci";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className='darkmode-btn' onClick={toggleTheme}>
      <CiLight />
    </button>
  );
};

export default ThemeToggle;
