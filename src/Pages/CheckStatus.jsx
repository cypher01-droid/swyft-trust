import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, CheckCircle2, AlertCircle, ShieldAlert, LogIn } from 'lucide-react';
import './CheckStatus.css';
import axios from '@/utils/axios';


export default function CheckStatus() {
  const [trackCode, setTrackCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleTrack = async (e) => {
  e.preventDefault();
  if (!trackCode) return;

  setLoading(true);
  setResult(null);

  try {
    const res = await axios.get(
  `/transaction/check-status/${trackCode.toUpperCase()}`
);
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Tracking code not found");
      return;
    }

    setResult(data);
  } catch (err) {
    alert("Server unavailable");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="public-status-container">
      <div className="status-glass-card">
        <header className="status-header">
          <div className="brand-dot"></div>
          <h1>Track Asset Progress</h1>
          <p>Enter your tracking code below to see the current stage of your refund or loan.</p>
        </header>

        <form onSubmit={handleTrack} className="status-search-box">
          <input 
            type="text" 
            placeholder="Reference Code (e.g. RF-99201)" 
            value={trackCode}
            onChange={(e) => setTrackCode(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : <Search size={20} />}
          </button>
        </form>

        <AnimatePresence>
          {result && (
            <motion.div className="status-display" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* 4-STAGE TIMELINE */}
              <div className="status-timeline">
                {result.stages.map((stage, idx) => (
                  <div key={idx} className={`step ${idx <= result.currentStage ? 'active' : ''}`}>
                    <div className="dot">
                       {idx < result.currentStage ? <CheckCircle2 size={14}/> : <Clock size={14}/>}
                    </div>
                    <span>{stage}</span>
                  </div>
                ))}
              </div>

              {/* ACTION CALLOUT */}
              {result.status === "Final Approval" && (
                <motion.div className="withdraw-callout" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                  <div className="callout-icon"><ShieldAlert color="#9d50ff" /></div>
                  <div className="callout-text">
                    <h4>Funds are Ready</h4>
                    <p>Your funds have reached the final stage. You must log in to your secure dashboard to initiate the withdrawal.</p>
                  </div>
                  <button className="login-redirect-btn" onClick={() => navigate('/login')}>
                    <LogIn size={18} /> Login to Withdraw
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
