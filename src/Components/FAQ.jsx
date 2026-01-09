import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ShieldCheck, Zap } from "lucide-react";
import "./FAQ.css";

const faqs = [
  {
    question: "How do I open a new account?",
    answer: "Simply click 'Get Started', complete the secure multi-step registration, and upload your KYC documents. Your account is typically activated within 12-24 hours of approval.",
  },
  {
    question: "How can I deposit or withdraw funds?",
    answer: "Initiate a request from your dashboard. Our admin team manually reviews and verifies each transaction for maximum security. Once confirmed, your Available Balance updates instantly.",
  },
  {
    question: "How do refunds work?",
    answer: "You can track refunds via your unique tracking code. Once the 4-stage verification process is complete, funds are moved from Pending to your Available Balance.",
  },
  {
    question: "Can I manage multiple currencies?",
    answer: "Yes. Swyft Trust supports both Fiat and Crypto assets. You can hold, swap, and transfer between different currencies directly from your global wallet.",
  },
  {
    question: "How do I apply for a loan?",
    answer: "Navigate to 'Request Loan' in the Financial Services menu. Select your loan type (Business, Personal, etc.), submit the form, and track the audit progress in real-time.",
  },
  {
    question: "Is my data secure?",
    answer: "We utilize AES-256 bank-grade encryption and strict KYC/AML compliance protocols to ensure your data and assets are protected against unauthorized access.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <motion.div 
          className="faq-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="status-badge-faq">
            <HelpCircle size={14} /> <span>Support Center</span>
          </div>
          <h2>Common Inquiries</h2>
          <p>Everything you need to know about the Swyft Trust ecosystem.</p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-wrapper ${openIndex === idx ? "active" : ""}`}>
              <button 
                className="faq-question-btn" 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} color={openIndex === idx ? "var(--accent-purple)" : "#64748b"} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    className="faq-answer-container"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="faq-answer-content">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Secure Footer Note */}
        <div className="faq-security-note">
           <ShieldCheck size={18} color="var(--success)" />
           <span>Still need help? Our 24/7 Secure Support is available in the dashboard.</span>
        </div>
      </div>
    </section>
  );
}
