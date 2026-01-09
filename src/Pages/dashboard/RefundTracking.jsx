import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import './RefundTracking.css';

export default function RefundTracking() {
  const [trackCode, setTrackCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackCode) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('authToken');

      const res = await fetch(
        `http://localhost:5000/api/refund/track?code=${trackCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Refund not found');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="refund-container">
      <header className="page-header">
        <h1>Refund Tracking</h1>
        <p>Track the progress of your returned funds</p>
      </header>

      <div className="card-glass search-card">
        <form onSubmit={handleTrack}>
          <div className="search-input-wrapper">
            <Search size={20} />
            <input
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
              placeholder="Enter Tracking Code (e.g. RF-88221)"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>
        {error && <p className="error-text">{error}</p>}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            className="refund-result-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="result-header">
              <div>
                <span>Reference ID</span>
                <h4>{result.code}</h4>
              </div>
              <div>
                <span>Amount</span>
                <h4>${result.amount}</h4>
              </div>
            </div>

            <div className="refund-timeline">
              {result.stages.map((stage, i) => (
                <div
                  key={i}
                  className={`timeline-item ${
                    i <= result.currentStage ? 'active' : ''
                  }`}
                >
                  <div className="timeline-marker">
                    {i < result.currentStage ? (
                      <CheckCircle2 size={16} />
                    ) : i === result.currentStage ? (
                      <Clock size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                  </div>
                  <div>
                    <h5>{stage.label}</h5>
                    <p>{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="status-footer">
              <FileText size={16} />
              <span>Last Update: {result.lastUpdate}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
