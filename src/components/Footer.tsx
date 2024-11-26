import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import "../styles/Footer.css"; // CSS dosyasını dahil et

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://www.linkedin.com/in/serkanbilsel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={30} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2024 News Website.Desinged by:{" "}
          <a
            href="https://www.linkedin.com/in/serkanbilsel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Serkan Bilsel.
          </a>
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
