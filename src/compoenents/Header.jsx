// Header.jsx
import React, { useState } from "react";
import '../common/Navigation.css';

import logo from '../assets/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="navbar" role="banner">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="contact-info">
          <span aria-label="Phone number">📞 +91 7654327890</span>
          <span aria-label="Email address">✉️ bonc@gmail.com</span>
        </div>
        <div className="actions">
          <button className="list-btn" aria-label="List your business">
            List Your Business
          </button>
          <button className="auth-btn" aria-label="Sign in or sign up">
            Sign In / Sign Up
          </button>
          <button className="help-btn" aria-label="Get help">
            Need Help?
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="main-nav" aria-label="Main navigation">
        <div className="logo">
          <img src={logo} alt="BONC Logo" height="40" />
        </div>

        {/* Hamburger for mobile */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="/about">About US</a></li>
          <li><a href="/">Products Listing</a></li>
          <li><a href="/" className="active">Service</a></li>
          <li><a href="/">Categories</a></li>
          <li><a href="/">Contact</a></li>
        </ul>

        <div className="search-section">
          <input 
            type="text" 
            placeholder="📍 Location" 
            aria-label="Location"
          />
          <input 
            type="text" 
            placeholder="📂 Category" 
            aria-label="Category"
          />
          <form className="search-box" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search Product/ Business" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products or businesses"
            />
            <button type="submit" className="search-btn" aria-label="Search">
              🔍
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;