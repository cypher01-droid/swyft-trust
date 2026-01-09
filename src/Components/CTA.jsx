import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import "./CTA.css";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-container">
        <motion.div 
          className="cta-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ translateY: -5 }}
        >
          {/* Decorative background elements */}
          <div className="cta-glow-circle top-right"></div>
          <div className="cta-glow-circle bottom-left"></div>

          <div className="cta-content">
            <div className="cta-badge">
              <Zap size={14} fill="currentColor" />
              <span>Instant Activation Available</span>
            </div>
            
            <h2>Ready to Join the <br /> <span>Financial Revolution?</span></h2>
            <p>
              Open your secure account today. Experience the power of multi-currency management, 
              instant refunds, and automated loan auditing.
            </p>

            <div className="cta-actions">
              <button className="cta-primary-btn" onClick={() => navigate('/register')}>
                Get Started Now <ArrowRight size={20} />
              </button>
            </div>

            <div className="cta-trust-strip">
              <div className="trust-mini">
                <ShieldCheck size={16} /> <span>Bank-Grade Encryption</span>
              </div>
              <div className="trust-mini">
                <Globe size={16} /> <span>Global Asset Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
