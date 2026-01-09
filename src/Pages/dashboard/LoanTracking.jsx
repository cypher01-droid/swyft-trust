import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, CheckCircle2, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import './LoanTracking.css';

export default function LoanTracking() {
  const [trackCode, setTrackCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackCode) return;

    setLoading(true);
    // Simulate lookup (2s)
    setTimeout(() => {
      setLoading(false);
      setResult({
        code: trackCode.toUpperCase(),
        amount: 5000.00,
        currency: "USD",
        interestRate: "8%",
        duration: "6 Months",
        monthlyPayment: 868.50,
        currentStage: 2, // Stage 2 (Verification)
        stages: [
          { label: "Application Submitted", desc: "We have your request" },
          { label: "Processing & Audit", desc: "Reviewing your eligibility" },
          { label: "Verification", desc: "Final checks and KYC validation" },
          { label: "Funds Released", desc: "Loan approved and paid out" }
        ],
        lastUpdate: "Jan 07, 2026 - 14:10"
      });
    }, 2000);
  };

  return (
    <div className="loan-container">
      <header className="page-header">
        <h1>Loan Tracking</h1>
        <p>Monitor the status of your credit application</p>
      </header>

      {/* --- Search Input (Re-used from Refund Tracking) --- */}
      <div className="card-glass search-card">
        <form onSubmit={handleTrack}>
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Enter Tracking Code (e.g. LOAN-12345)" 
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Track"}
            </button>
          </div>
        </form>
      </div>

      {/* --- Results Display --- */}
      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="loan-result-box"
          >
            <div className="result-header">
              <div className="tx-ref">
                <span>Reference ID</span>
                <h4>{result.code}</h4>
              </div>
              <div className="tx-amount">
                <span>Amount</span>
                <h4>${result.amount.toLocaleString()}</h4>
              </div>
            </div>

            {/* --- Loan Terms Summary --- */}
            <div className="loan-terms-summary">
                <div className="term-item">
                    <Calendar size={16}/>
                    <p>Duration: <strong>{result.duration}</strong></p>
                </div>
                <div className="term-item">
                    <DollarSign size={16}/>
                    <p>Interest: <strong>{result.interestRate}</strong></p>
                </div>
                 <div className="term-item full-width">
                    <p>Monthly Repayment: <strong>${result.monthlyPayment.toLocaleString()}</strong></p>
                </div>
            </div>

            {/* --- 4-STAGE TIMELINE (Re-used logic) --- */}
            <div className="loan-timeline">
              {result.stages.map((stage, index) => (
                <div key={index} className={`timeline-item ${index <= result.currentStage ? 'active' : ''} ${index < result.currentStage ? 'completed' : ''}`}>
                  <div className="timeline-marker">
                    {index < result.currentStage ? <CheckCircle2 size={16} /> : index === result.currentStage ? <Clock size={16} /> : <AlertCircle size={16} />}
                  </div>
                  <div className="timeline-content">
                    <h5>{stage.label}</h5>
                    <p>{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="disclaimer">
              Loan status is updated manually by the admin team. Once approved, funds are released to your Available Balance.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
