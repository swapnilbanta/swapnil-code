import React from "react";
import "./Footer.css";
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Section */}
      <div className="footer-left">
          <img src={logo} alt="BONC Logo" height="40" />
        <br></br>
        <p className="contact-phone">bonc@gmail.com</p>
      </div>

      {/* Middle Section */}
      <div className="footer-middle">
        <div className="footer-column">
          <h4>Products</h4>
          <ul>
            <li>Business Listing</li>
            <li>Lead Generation</li>
            <li>Verified Profiles</li>
            <li>Premium Plans</li>
            <li>Connect</li>
          </ul>
            <p className="contact-phone">+91 7654327897</p>

        </div>
        <div className="footer-column">
          <h4>About BONC</h4>
          <ul>
            <li>About Us</li>
            <li>Partners</li>
            <li>Press & Media</li>
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="footer-right">
        <div className="office">
          <h4>OFFICE LOCATION</h4>
          <p>ABC Company, 123 East, 17th Street, St. louis 10001</p>
        </div>

        <div className="newsletter">
          <h4>News letter</h4>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email address" />
            <button className="mail-btn">
              {/* <Mail size={20} /> */}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2025 BONC. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
