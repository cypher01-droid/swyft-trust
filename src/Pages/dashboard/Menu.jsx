import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowDownLeft, ArrowUpRight, Send, Shuffle, History, 
  Search, Briefcase, Wallet, Globe, Network, ShieldCheck, 
  Key, Lock, Smartphone, LifeBuoy, FileText, Scale, BadgeCheck,
  ChevronRight, Loader2, Coins, Landmark
} from 'lucide-react';
import './menu.css';

export default function MenuHub() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Simulated Secure Navigation
  const secureNavigate = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 2500); // 2.5s secure loading time
  };

  const menuSections = [
    {
      title: "ACCOUNT",
      items: [
        { label: "Deposit", icon: <ArrowDownLeft />, path: "/dashboard/deposit" },
        { label: "Withdraw", icon: <ArrowUpRight />, path: "/dashboard/withdraw" },
        { label: "Send & Swap", icon: <Send />, path: "/dashboard/send" },
        { label: "Transaction History", icon: <History />, path: "/dashboard/history" },
      ]
    },
    {
      title: "FINANCIAL SERVICES",
      items: [
        { label: "Request Refund", icon: <Landmark />, path: "/dashboard/refund-request" },
        { label: "Refund Tracking", icon: <Search />, path: "/dashboard/refund" },
        { label: "Request Loan", icon: <Landmark />, path: "/dashboard/request-loan" },
        { label: "Check Status", icon: <BadgeCheck />, path: "/check-status", public: true },
      ]
    },
    {
      title: "SECURITY",
      items: [
        { label: "KYC Verification", icon: <ShieldCheck />, path: "/dashboard/kyc" },
      ]
    }
  ];

  return (
    <div className="menu-hub-container">
      {/* 2026 Secure Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="secure-loader-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loader-content">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader2 size={40} color="#9d50ff" />
              </motion.div>
              <p>Establishing Secure Connection...</p>
              <div className="encryption-line">AES-256 BIT ENCRYPTION ACTIVE</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="menu-header">
        <h1>Command Center</h1>
        <p>Manage your global financial assets</p>
      </header>

      <div className="menu-grid">
        {menuSections.map((section, idx) => (
          <div key={idx} className="menu-section">
            <h2 className="section-label">{section.title}</h2>
            <div className="section-list">
              {section.items.map((item, i) => (
                <button 
                  key={i} 
                  className="menu-item-row"
                  onClick={() => secureNavigate(item.path)}
                >
                  <div className="item-icon-bg">{item.icon}</div>
                  <span className="item-label">{item.label}</span>
                  <ChevronRight size={16} className="ml-auto opacity-30" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <footer className="menu-footer">
        <button onClick={() => secureNavigate('/legal/terms')}>Terms of Service</button>
        <div className="dot-sep"></div>
        <button onClick={() => secureNavigate('/legal/privacy')}>Privacy Policy</button>
      </footer>
    </div>
  );
}
