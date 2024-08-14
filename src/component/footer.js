import React from 'react';
import logo from './images/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <img className='footerlogo' src={logo} alt="logo" />
      <div className="section">
        <h5>Voting DAO</h5>
        <p>Empowering decentralized governance through blockchain technology.</p>
      </div>
      <div className="section quick-links">
        <h5>Quick Links</h5>
        <ul>
          <li><a href="#" className="link">Home</a></li>
          <li><a href="#" className="link">About</a></li>
          <li><a href="#" className="link">Governance</a></li>
          <li><a href="#" className="link">Contact</a></li>
        </ul>
      </div>
      <div className="section contact-info">
        <h5>Contact Us</h5>
        <p>Email: <a href="mailto:support@votingdao.org" className="link">support@votingdao.org</a></p>
        <p>Address: 123 Blockchain Blvd, Crypto City, BC 12345</p>
      </div>
      <div className="copyright">
        <p>© {new Date().getFullYear()} Voting DAO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;