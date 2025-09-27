import React, { useState } from "react";
import "./Navbar.css";

import logo from '../assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="logo">
           <img src={logo} alt="BONC Logo" height="50" />
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "open" : ""}
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Request</a></li>
        <li><a href="#">Messages</a></li>
        <li><a href="/">Products</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Edit Profile</a></li>
        <li><a href="#">Need Help?</a></li>
      </ul>

      <div className="icons">
        <div className="bell">
          <span className="dot"></span>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="avatar"
        />
      </div>
    </nav>
  );
};

export default Navbar;
