import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Globe, Zap, Target } from "lucide-react";
import "./AboutUs.css";
import bankImg from "../assets/bank.jpg";

export default function AboutUs() {
  const pillars = [
    { icon: <ShieldCheck size={20} />, text: "Regulated Security" },
    { icon: <Globe size={20} />, text: "Global Coverage" },
    { icon: <Zap size={20} />, text: "Instant Settlements" },
  ];

  return (
    <section id="about" className="about-us-section">
      <div className="about-container">
        {/* Left Side: Visual Asset */}
        <motion.div 
          className="about-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="image-glow"></div>
          <img src={bankImg} alt="Swyft Trust HQ" className="about-main-img" />
          
          {/* Floating Achievement Badge */}
          <div className="floating-badge">
            <Target size={24} color="#9d50ff" />
            <div>
              <strong>100%</strong>
              <span>Transparency</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Narrative */}
        <motion.div 
          className="about-text-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">
             <span>OUR MISSION</span>
          </div>
          <h2>Redefining the <br /> <span>Global Financial</span> Standard</h2>
          <p>
            Swyft Trust Union Bank isn't just a financial institution; it's a technology-driven ecosystem designed for the modern world. We bridge the gap between traditional banking and the digital asset revolution.
          </p>
          <p className="sub-text">
            Our mission is to empower individuals and businesses with seamless financial services, combining bank-grade security with instant, transparent innovation.
          </p>

          <div className="pillars-grid">
            {pillars.map((pill, i) => (
              <div key={i} className="pillar-item">
                <div className="pillar-icon">{pill.icon}</div>
                <span>{pill.text}</span>
              </div>
            ))}
          </div>

          <button className="about-cta" onClick={() => window.location.href='/register'}>
            Join the Union
          </button>
        </motion.div>
      </div>
    </section>
  );
}
