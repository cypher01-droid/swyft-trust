import React from "react";
import "./Features.css";

const featuresData = [
  {
    title: "Refunds",
    desc: "Request or approve refunds instantly with full tracking and notifications.",
    color: "#8B5CF6",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M12 4v4M12 20v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Deposits & Withdrawals",
    desc: "Submit deposit or withdrawal requests, with admin approval and balance updates.",
    color: "#10B981",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M12 1v22M5 5h14v14H5V5z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Multi-Currency Support",
    desc: "Hold, convert, and transact in multiple currencies seamlessly.",
    color: "#F59E0B",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2"/>
        <path d="M12 6v6l4 2" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: "Loans",
    desc: "Apply for loans, track repayment schedules, and manage interest calculations.",
    color: "#EF4444",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "KYC Verification",
    desc: "Secure account creation with ID and address verification for safety and compliance.",
    color: "#6366F1",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M12 1v22M5 5h14v14H5V5z" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Transaction History",
    desc: "Detailed logs of all deposits, withdrawals, refunds, and loan transactions.",
    color: "#FACC15",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h16" stroke="#FACC15" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: "Notifications & Alerts",
    desc: "Receive instant updates on approvals, rejections, and account activity.",
    color: "#14B8A6",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M12 22c1.104 0 2-.896 2-2H10c0 1.104.896 2 2 2zm6-6v-5c0-3.075-1.64-5.64-4.5-6.32V4a1.5 1.5 0 10-3 0v.68C7.64 5.36 6 7.925 6 11v5l-2 2v1h16v-1l-2-2z" fill="#14B8A6"/>
      </svg>
    )
  },
  {
    title: "Payment Methods Integration",
    desc: "Support for PayPal, Stripe, Bank transfers, and other international payment gateways.",
    color: "#8B5CF6",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16v10H4V7z" stroke="#8B5CF6" strokeWidth="2"/>
        <path d="M4 10h16" stroke="#8B5CF6" strokeWidth="2"/>
      </svg>
    )
  },
];

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <h2>Why Choose Swyft Trust?</h2>
        <div className="features-grid">
          {featuresData.map((f, idx) => (
            <div key={idx} className="feature-card" style={{borderTopColor: f.color}}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
