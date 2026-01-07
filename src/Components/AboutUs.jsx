// Components/AboutUs.jsx
import React from "react";
import "./AboutUs.css";
import bankImg from "../assets/bank.jpg";

export default function AboutUs() {
  return (
    <section id="about" className="about-us">
      <div className="about-container">
        <div className="about-text">
          <h2>About Swyft Trust Union Bank</h2>
          <p>
            Swyft Trust Union Bank is your reliable partner in modern banking. We offer multi-currency accounts, instant refunds, secure deposits and withdrawals, and easy access to loans. Our mission is to empower individuals and businesses with seamless financial services, combining security, transparency, and innovation.
          </p>
          <p>
            Trusted by customers globally, we leverage advanced technology to make banking simple, fast, and accessible. Join us and experience the next level of financial freedom.
          </p>
        </div>
        <div className="about-image">
<img src={bankImg} alt="Swyft Trust Banking Illustration" />        </div>
      </div>
    </section>
  );
}
