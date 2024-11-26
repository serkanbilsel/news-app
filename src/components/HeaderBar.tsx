import React from "react";
import { Link } from "react-router-dom";
import { BiBroadcast } from "react-icons/bi"; // Live için

import "../styles/HeaderBar.css";

const HeaderBar: React.FC = () => {
  return (
    <header className="header-bar">
      <div className="logo">
        <Link to="/">
          <span className="logo-icon">🅱️</span>
          <span className="logo-text">B-NEWS</span>
        </Link>
      </div>
      <nav className="header-links">
        {/* Live */}
        <Link to="/live" className="header-link">
          <BiBroadcast className="header-icon live-icon" />
          <span>Live</span>
        </Link>
      </nav>
    </header>
  );
};

export default HeaderBar;
