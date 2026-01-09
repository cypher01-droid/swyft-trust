import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Zap, ShieldQuestion } from 'lucide-react';
import './Cards.css';

export default function CardsPage() {
  return (
    <div className="cards-container">
      <header className="page-header">
        <h1>My Card</h1>
        <p>Manage your virtual debit card settings</p>
      </header>

      {/* --- COMING SOON VIEW --- */}
      <motion.div
        className="coming-soon-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <CreditCard size={90} color="var(--accent-purple)" />

        <h2>Card Services Coming Soon</h2>

        <p>
          We’re building a secure global card system for online and in-store payments.
          Virtual cards, physical cards, spending controls, and freeze protection
          will be available soon.
        </p>

        <div className="info-pill">
          <Zap size={14} />
          <span>Early access will be granted to verified users</span>
        </div>

        <div className="info-note">
          <ShieldQuestion size={16} />
          <span>Card issuance requires completed KYC verification</span>
        </div>
      </motion.div>
    </div>
  );
}
