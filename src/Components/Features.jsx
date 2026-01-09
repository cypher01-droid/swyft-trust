import React from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, RefreshCw, Layers, CreditCard, ShieldCheck, History, Bell, Zap,
  TrendingUp, TrendingDown, LayoutGrid
} from 'lucide-react';
import "./Features.css";

const featuresData = [
  {
    title: "Deposits & Withdrawals",
    desc: "Submit requests with admin approval and real-time balance updates.",
    color: "#10B981",
    icon: Zap
  },
  {
    title: "Multi-Currency Wallet",
    desc: "Hold, convert, and transact in multiple currencies seamlessly.",
    color: "#F59E0B",
    icon: Layers
  },
  {
    title: "Loans & Finance",
    desc: "Apply for loans, track repayment schedules, and manage interest.",
    color: "#EF4444",
    icon: CreditCard
  },
  {
    title: "Refund Tracking",
    desc: "Track refunds instantly with full visibility into the approval stages.",
    color: "#8B5CF6",
    icon: RefreshCw
  },
  {
    title: "KYC Verification",
    desc: "Secure account creation with ID and address verification for safety.",
    color: "#6366F1",
    icon: ShieldCheck
  },
  {
    title: "Transaction History",
    desc: "Detailed logs of all deposits, withdrawals, and loan transactions.",
    color: "#FACC15",
    icon: History
  },
];

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <motion.div 
          className="features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="status-badge-feat">
            <LayoutGrid size={14} /> <span>Core Platform Features</span>
          </div>
          <h2>A Suite of Tools for Modern Finance</h2>
          <p>Everything you need to manage your assets securely and efficiently in one dashboard.</p>
        </motion.div>
        
        <div className="features-grid">
          {featuresData.map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div 
                key={idx} 
                className="feature-card" 
                style={{borderTopColor: f.color}}
                whileHover={{ translateY: -5, boxShadow: '0 15px 40px rgba(0,0,0,0.3)' }}
              >
                <div className="feature-icon" style={{color: f.color, background: `${f.color}1a`}}>
                  <Icon size={24} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
