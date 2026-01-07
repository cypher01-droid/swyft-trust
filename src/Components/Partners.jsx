import React from "react";
import "./Partners.css";

const partners = [
  { name: "PayPal", color: "#003087", svg: (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <path d="M8.5 6h5l-1 12h-5l1-12z" fill="#003087"/>
      <path d="M10 6h5l-1 12h-5l1-12z" fill="#009CDE"/>
    </svg>
  )},
  { name: "CashApp", color: "#00C244", svg: (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#00C244"/>
      <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">$</text>
    </svg>
  )},
  { name: "MonzoBank", color: "#FF5A5F", svg: (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FF5A5F"/>
    </svg>
  )},
  { name: "Revolut", color: "#007BFF", svg: (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#007BFF"/>
    </svg>
  )},
  { name: "Payoneer", color: "#FF6D00", svg: (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <path d="M2 12h20" stroke="#FF6D00" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )},
  { name: "Stripe", color: "#6772E5", svg: (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" fill="#6772E5"/>
    </svg>
  )},
  { name: "Skrill", color: "#00ADEE", svg: (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#00ADEE"/>
    </svg>
  )},
  { name: "Bank of America", color: "#E41F26", svg: (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <path d="M2 18h20V6H2v12z" fill="#E41F26"/>
    </svg>
  )}
];

export default function Partners() {
  return (
    <section className="partners-section" id="partners">
      <div className="partners-container">
        <h2>Our Trusted Partners & Sponsors</h2>
        <div className="partners-grid">
          {partners.map((p, idx) => (
            <div key={idx} className="partner-card" style={{borderColor: p.color}}>
              <div className="partner-logo">{p.svg}</div>
              <p>{p.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
