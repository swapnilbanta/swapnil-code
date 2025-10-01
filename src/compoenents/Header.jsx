// Header.jsx
import React, { useState } from "react";
import "../common/Navigation.css";
import logo from "../assets/logo.png";

// import API
import { getAllProductsAndServicesByUser } from "../services/api";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]); // store API results

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const res = await getAllProductsAndServicesByUser(searchQuery);
      console.log("🔍 Search Results:", res);

      const data = res?.Data || [];
      setResults(data); // ✅ update state
    } catch (err) {
      console.error("❌ Search failed:", err);
    }
  };

  return (
    <>
      <header className="navbar" role="banner">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="contact-info">
            <span aria-label="Phone number">📞 +91 7654327890</span>
            <span aria-label="Email address">✉️ bonc@gmail.com</span>
          </div>
          <div className="actions">
            <button className="list-btn">List Your Business</button>
            <button className="auth-btn">Sign In / Sign Up {"->]"}</button>
            <button className="help-btn">Need Help?</button>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="main-nav">
          <div className="logo">
            <img src={logo} alt="BONC Logo" height="40" />
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>

          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Products Listing</a></li>
            <li><a href="/" className="active">Service</a></li>
            <li><a href="/">Categories</a></li>
            <li><a href="/">Contact</a></li>
          </ul>

          {/* Search */}
          <form className="search-section" onSubmit={handleSearch}>
            <input type="text" placeholder="📍 Location" />
            <input type="text" placeholder="📂 Category" />
            <input
              type="text"
              placeholder="Search Product/ Business"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>
        </nav>
      </header>
    </>
  );
};

export default Header;
