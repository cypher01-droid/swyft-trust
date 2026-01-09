import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  ShieldQuestion,
  Landmark,
  Zap,
  CreditCard,
  Bitcoin
} from 'lucide-react';
import './WithdrawPage.css';
import axios from '@/utils/axios';


export default function WithdrawPage() {
  const navigate = useNavigate();

  const [availableBalance, setAvailableBalance] = useState(0);
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');

  // ===============================
  // FETCH REAL BALANCE
  // ===============================
  useEffect(() => {
  const fetchBalance = async () => {
    try {
      const res = await axios.get('/user/dashboard');
      setAvailableBalance(res.data.balances?.USD?.available || 0);
    } catch (err) {
      console.error('Balance fetch failed', err);
    }
  };

  fetchBalance();
}, []);


  const handleNext = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      setError('Insufficient available balance');
      return;
    }

    if (!method) {
      setError('Select a withdrawal method');
      return;
    }

    setError('');
    setStep(2);
  };

  // ===============================
  // SUBMIT TO BACKEND
  // ===============================
  const handleSubmit = async () => {
  try {
    const res = await axios.post('/transaction/withdraw', {
      amount: parseFloat(amount),
      method,
      details,
      currency: 'USD'
    });

    setReference(res.data.reference);
    setStep(3);
  } catch (err) {
    setError(
      err.response?.data?.error ||
      err.response?.data?.message ||
      'Withdrawal request failed'
    );
  }
};


  return (
    <div className="withdraw-container">
      <header className="page-header">
        <h1>Withdraw Funds</h1>
        <div className="available-box">
          <span>Available to Withdraw</span>
          <h3>${availableBalance.toLocaleString()}</h3>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div className="card-glass">
            <div className="input-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
              {error && (
                <p className="error-text">
                  <AlertTriangle size={14} /> {error}
                </p>
              )}
            </div>

            <div className="method-grid">
              <button onClick={() => setMethod('Zelle')} className={method === 'Zelle' ? 'active' : ''}>
                <Zap /> Zelle
              </button>
              <button onClick={() => setMethod('Revolut')} className={method === 'Revolut' ? 'active' : ''}>
                <CreditCard /> Revolut
              </button>
              <button onClick={() => setMethod('Wire')} className={method === 'Wire' ? 'active' : ''}>
                <Landmark /> Wire
              </button>
              <button onClick={() => setMethod('Crypto')} className={method === 'Crypto' ? 'active' : ''}>
                <Bitcoin /> Crypto
              </button>
            </div>

            <button className="primary-btn" onClick={handleNext}>
              Review Withdrawal <ArrowUpRight />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div className="card-glass">
            <p>
              Withdrawing <strong>${amount}</strong> via <strong>{method}</strong>
            </p>

            <textarea
              placeholder="Enter payment details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />

            <div className="security-note">
              <ShieldQuestion />
              <p>Withdrawal will remain Pending until approved</p>
            </div>

            <div className="action-row">
              <button onClick={() => setStep(1)}>Back</button>
              <button onClick={handleSubmit} disabled={!details}>
                Confirm
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div className="success-card">
            <CheckCircle2 size={60} />
            <h2>Withdrawal Submitted</h2>
            <p>Status: Pending</p>
            <code>{reference}</code>
            <button onClick={() => navigate('/dashboard')}>Return</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
