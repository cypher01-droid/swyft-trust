import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import './RefundRequest.css';
import axios from '@/utils/axios';


export default function RequestRefund() {
  const [transactionId, setTransactionId] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!transactionId || !amount || !reason) return;

  setLoading(true);
  setError('');
  setSuccess(null);

  try {
    const res = await axios.post('/transaction/refund-request', {
      transactionId,
      amount: Number(amount),
      reason
    });

    setSuccess(res.data.trackingCode);
    setTransactionId('');
    setAmount('');
    setReason('');
  } catch (err) {
    setError(
      err.response?.data?.error ||
      err.response?.data?.message ||
      'Refund request failed'
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="refund-request-container">
      <header className="page-header">
        <h1>Request a Refund</h1>
        <p>Submit a refund request for an eligible transaction</p>
      </header>

      <motion.form
        className="card-glass refund-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="form-group">
          <label>Transaction ID</label>
          <input
            type="text"
            placeholder="TX-8822"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Refund Amount</label>
          <input
            type="number"
            placeholder="450.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Reason for Refund</label>
          <textarea
            placeholder="Explain the issue clearly..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {error && (
          <div className="error-box">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <button className="submit-btn" disabled={loading}>
          {loading ? <Loader2 className="spin" size={18} /> : 'Submit Refund Request'}
        </button>
      </motion.form>

      {/* SUCCESS CONFIRMATION */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="refund-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle2 size={48} />
            <h2>Refund Submitted</h2>
            <p>Your tracking code:</p>
            <strong className="tracking-code">{success}</strong>
            <p>
              Track your refund on the <b>Refund Tracking</b> page.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
