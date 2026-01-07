import React from "react";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* HERO TEXT */}
        <div className="hero-text">
  <h1>Swyft Trust Union Bank</h1>
  <p>
    Your global financial hub. Manage multiple currencies, track refunds, make deposits and withdrawals, and access loans — securely, instantly, and effortlessly.
  </p>
          <div className="hero-buttons">
            <a href="#signup" className="btn-primary">Sign Up</a>
            <a href="#features" className="btn-secondary">Learn More</a>
          </div>
        </div>

        {/* HERO CARD */}
        <div className="hero-card">
          <div className="card-header">
            <span className="card-title">Swyft Trust</span>
            <span className="card-chip"></span>
          </div>
          <div className="card-balance">
            $12,345.67
          </div>
          <div className="card-footer">
            <span>USD</span>
            <span>Balance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
