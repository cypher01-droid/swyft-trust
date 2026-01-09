import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import "./hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        {/* HERO TEXT */}
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="security-tag">
            <ShieldCheck size={16} /> <span>Regulated Global Banking</span>
          </div>
          <h1>
            The Future of <br />
            <span>Digital Finance</span>
          </h1>
          <p>
            Swyft Trust Union Bank is your global hub for multi-currency management, 
            instant loans, and secure asset tracking. Experience banking without borders.
          </p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/register')} className="btn-primary">
              Get Started <ArrowRight size={18} />
            </button>
            <a href="#features" className="btn-secondary">
              <Zap size={18} /> View Features
            </a>
          </div>
        </motion.div>

        {/* HERO CARD - FLOATING ANIMATION */}
        <motion.div 
          className="hero-card-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div 
            className="hero-card"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="card-header">
              <div className="card-brand">
                <div className="brand-dot"></div>
                <span>Swyft Trust</span>
              </div>
              <div className="card-chip"></div>
            </div>
            <div className="card-body">
              <span className="label">Total Balance</span>
              <div className="card-balance">
                $14,500.75
              </div>
            </div>
            <div className="card-footer">
              <div className="footer-item">
                <span>Currency</span>
                <strong>USD / BTC</strong>
              </div>
              <div className="footer-item">
                <span>Status</span>
                <strong className="active-text">Verified</strong>
              </div>
            </div>
            {/* Decorative Glow */}
            <div className="card-glow"></div>
          </motion.div>
          
          {/* Stats Overlay Bubble */}
          <motion.div 
             className="stats-bubble"
             animate={{ x: [0, 10, 0] }}
             transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Zap size={14} color="#9d50ff" />
            <span>Instant Swap Active</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
