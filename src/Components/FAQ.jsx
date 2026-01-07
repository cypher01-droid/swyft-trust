// Components/FAQ.jsx
import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "How do I open a new account?",
    answer:
      "Simply click 'Sign Up', fill out the multi-step registration form, upload your KYC documents, and your account will be activated once approved.",
  },
  {
    question: "How can I deposit or withdraw funds?",
    answer:
      "Submit a deposit or withdrawal request from your dashboard. This will verified and approved, and your balance will be updated instantly.",
  },
  {
    question: "How do refunds work?",
    answer:
      "Refunds can be requested from your transaction history. Once approved , the refunded amount will reflect in your account balance.",
  },
  {
    question: "Can I manage multiple currencies?",
    answer:
      "Yes! Swyft Trust Union Bank supports multiple currencies. You can deposit, withdraw, and track balances in different currencies seamlessly.",
  },
  {
    question: "How do I apply for a loan?",
    answer:
      "Go to the Loans section on your dashboard, submit a loan request with the required details, and wait for approval. Approved loans will be credited to your account.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We follow best practices for data protection and KYC verification. All sensitive information is encrypted and securely stored.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${openIndex === idx ? "open" : ""}`}
              onClick={() => toggleFAQ(idx)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <span className="faq-toggle">{openIndex === idx ? "-" : "+"}</span>
              </div>
              {openIndex === idx && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
