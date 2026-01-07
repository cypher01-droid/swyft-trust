// Components/Footer.jsx
import React from "react";
import "./Footer.css";

const LogoSVG = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#6D28D9" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fill="#fff"
      fontSize="42"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
    >
      ST
    </text>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and description */}
        <div className="footer-about">
          <LogoSVG />
          <p>
            Swyft Trust Union Bank provides secure, multi-currency banking with deposits, withdrawals, refunds, and loans — all at your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#partners">Partners</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#signup">Sign Up</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@swyfttrust.com</p>
          <p>Phone: +1 234 567 8900</p>
          <p>Address: 123 Finance St, London, UK</p>
          <div className="footer-socials">
            {/* SVG Social Icons */}
            <a href="#"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M24 4.56a9.94 9.94 0 01-2.83.78 4.94 4.94 0 002.17-2.73 9.93 9.93 0 01-3.13 1.2 4.92 4.92 0 00-8.39 4.48A13.95 13.95 0 011.67 3.15a4.93 4.93 0 001.52 6.57 4.91 4.91 0 01-2.23-.62v.06a4.93 4.93 0 003.95 4.83 4.93 4.93 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.86 9.86 0 010 19.54a13.91 13.91 0 007.56 2.22c9.05 0 14-7.5 14-14v-.64A9.93 9.93 0 0024 4.56z"/></svg></a>
            <a href="#"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h10.96v-9.29H9.69v-3.62h2.96V8.42c0-2.93 1.78-4.53 4.38-4.53 1.25 0 2.32.09 2.63.13v3.05h-1.8c-1.41 0-1.68.67-1.68 1.65v2.16h3.35l-.44 3.62h-2.91V24h5.71c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/></svg></a>
            <a href="#"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.86 8.15 6.84 9.48.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.54 9.54 0 0112 6.85c.85.004 1.71.11 2.51.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.83-2.34 4.67-4.57 4.92.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .26.18.58.69.48 3.98-1.33 6.84-5.07 6.84-9.48 0-5.5-4.46-9.96-9.96-9.96z"/></svg></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Swyft Trust Union Bank. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
