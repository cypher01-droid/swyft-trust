import React from "react";
import { motion } from "framer-motion";
import { Globe, ShieldCheck, Zap } from "lucide-react";
import "./Partners.css";

const partners = [
  { name: "PayPal", icon: "PP" },
  { name: "CashApp", icon: "$" },
  { name: "Monzo", icon: "M" },
  { name: "Revolut", icon: "R" },
  { name: "Payoneer", icon: "P" },
  { name: "Stripe", icon: "S" },
  { name: "Zelle", icon: "Z" },
  { name: "Coinbase", icon: "C" },
];

export default function Partners() {
  return (
    <section className="partners-section" id="partners">
      <div className="partners-blur-top"></div>
      
      <div className="partners-container">
        <motion.div 
          className="partners-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="status-badge">
            <Globe size={14} /> <span>Global Network Active</span>
          </div>
          <h2>Trusted by Industry Leaders</h2>
          <p>We bridge the gap between traditional banking and the digital future.</p>
        </motion.div>

        {/* INFINITE MARQUEE ROW 1 */}
        <div className="marquee-wrapper">
          <motion.div 
            className="marquee-track"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...partners, ...partners].map((p, idx) => (
              <div key={idx} className="partner-logo-box">
                <div className="logo-symbol">{p.icon}</div>
                <span>{p.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* REVERSE MARQUEE ROW 2 */}
        <div className="marquee-wrapper">
          <motion.div 
            className="marquee-track reverse"
            animate={{ x: [-1000, 0] }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          >
            {[...partners, ...partners].map((p, idx) => (
              <div key={idx} className="partner-logo-box">
                <div className="logo-symbol alt">{p.icon}</div>
                <span>{p.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="partners-blur-bottom"></div>
    </section>
  );
}
