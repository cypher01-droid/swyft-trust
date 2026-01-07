// Components/CTA.jsx
import React from "react";
import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Ready to Experience Swyft Trust Union Bank?</h2>
        <p>
          Open your account today and manage multi-currency deposits, withdrawals, refunds, and loans effortlessly.
        </p>
        <a href="#signup" className="cta-button">
          Get Started
        </a>
      </div>
    </section>
  );
}
