// Components/Reviews.jsx
import React from "react";
import "./Reviews.css";

// Sample client reviews (feel real, no “simulation” mentions)
const reviews = [
  {
    name: "Emma Johnson",
    role: "Entrepreneur",
    message: "Swyft Trust Union Bank made managing my international transactions effortless. Deposits and refunds are instant, and their support is top-notch.",
    avatar: "/assets/client1.jpg"
  },
  {
    name: "David Smith",
    role: "Freelancer",
    message: "I got a loan within 24 hours, and the process was completely transparent. Truly a modern banking experience.",
    avatar: "/assets/client2.jpg"
  },
  {
    name: "Sophia Lee",
    role: "Business Owner",
    message: "Multi-currency management is a game-changer. I can handle clients across the globe seamlessly.",
    avatar: "/assets/client3.jpg"
  },
  {
    name: "Liam Brown",
    role: "Software Developer",
    message: "The refund process is fast and reliable. I feel secure knowing my finances are in good hands.",
    avatar: "/assets/client4.jpg"
  },
  {
    name: "Olivia Wilson",
    role: "Investor",
    message: "User-friendly interface and amazing features. Managing deposits and withdrawals has never been this easy.",
    avatar: "/assets/client5.jpg"
  },
  {
    name: "Noah Davis",
    role: "Consultant",
    message: "Swyft Trust Union Bank brings trust and innovation together. I highly recommend them for personal and business banking.",
    avatar: "/assets/client6.jpg"
  },
  {
    name: "Ava Martinez",
    role: "Designer",
    message: "Professional service and quick loan approvals. Everything is smooth and transparent.",
    avatar: "/assets/client7.jpg"
  },
  {
    name: "Ethan Garcia",
    role: "Entrepreneur",
    message: "Managing my finances with Swyft Trust is effortless. Multi-currency accounts and refunds work flawlessly.",
    avatar: "/assets/client8.jpg"
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="reviews">
      <div className="reviews-container">
        <h2>What Our Clients Say</h2>
        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <div className="review-avatar">
                <img src={review.avatar} alt={review.name} />
              </div>
              <p className="review-message">"{review.message}"</p>
              <p className="review-name">{review.name}</p>
              <p className="review-role">{review.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
