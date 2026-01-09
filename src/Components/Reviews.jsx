import React from "react";
import { motion } from "framer-motion";
import { Star, MessageCircle } from "lucide-react";
import "./Reviews.css";

const reviews = [
  { name: "Emma J.", role: "Entrepreneur", message: "Deposits and refunds are instant, and their support is top-notch.", rating: 5 },
  { name: "David S.", role: "Freelancer", message: "I got a loan within 24 hours, completely transparent. Truly modern banking.", rating: 5 },
  { name: "Sophia L.", role: "Business Owner", message: "Multi-currency management is a game-changer. I handle clients globally seamlessly.", rating: 5 },
  { name: "Liam B.", role: "Software Developer", message: "The refund process is fast and reliable. Finances are in good hands.", rating: 4 },
  { name: "Olivia W.", role: "Investor", message: "User-friendly interface and amazing features. Managing funds has never been easier.", rating: 5 },
  { name: "Noah D.", role: "Consultant", message: "Swyft Trust Union Bank brings trust and innovation together. Highly recommend.", rating: 5 },
  { name: "Ava M.", role: "Designer", message: "Professional service and quick loan approvals. Everything is smooth and transparent.", rating: 4 },
];

export default function Reviews() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-container">
        <motion.div 
          className="reviews-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="status-badge-rev">
            <MessageCircle size={14} /> <span>Social Proof & Trust</span>
          </div>
          <h2>What Our Clients Say Globally</h2>
        </motion.div>

        {/* INFINITE MARQUEE ROW 1 */}
        <div className="reviews-marquee-wrapper">
          <motion.div 
            className="reviews-track"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[...reviews, ...reviews, ...reviews].map((review, idx) => (
              <motion.div key={idx} className="review-card" whileHover={{ translateY: -5 }}>
                <div className="review-header">
                  <div className="review-meta">
                    <p className="review-name">{review.name}</p>
                    <p className="review-role">{review.role}</p>
                  </div>
                  <div className="rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#fcd34d" color="#fcd34d" />
                    ))}
                  </div>
                </div>
                <p className="review-message">"{review.message}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
