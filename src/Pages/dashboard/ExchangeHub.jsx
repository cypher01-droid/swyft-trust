import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shuffle,
  Send,
  ArrowDown,
  Info,
  CheckCircle2,
  RefreshCcw
} from 'lucide-react';
import './ExchangeHub.css';
import api from "@/utils/axios";


export default function ExchangeHub() {
  const [activeTab, setActiveTab] = useState('swap');

  const [balances, setBalances] = useState({});
  const [fromAsset, setFromAsset] = useState('BTC');
  const [toAsset, setToAsset] = useState('USD');

  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem('authToken');

  /* ================= FETCH DASHBOARD DATA ================= */
  useEffect(() => {
  const loadData = async () => {
    try {
      const { data } = await api.get("/user/dashboard");

      setBalances(data.balances);
      setRates(data.exchangeRates);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);


  if (loading) return <div className="loader">Loading Exchange Hub...</div>;

  const availableFrom = balances[fromAsset]?.available || 0;
  const fromRate = rates?.[fromAsset];
const toRate = rates?.[toAsset];

const rate =
  fromRate && toRate
    ? fromRate / toRate
    : 0;


  const estimatedOutput = amount ? (amount * rate).toFixed(2) : '0.00';

  const switchAssets = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setAmount('');
  };

  /* ================= SUBMIT ================= */
  const submitAction = async () => {
  try {
    setProcessing(true);

    const endpoint =
      activeTab === 'swap'
        ? "/transaction/swap"
        : "/transaction/send";

    const payload =
      activeTab === 'swap'
        ? { fromAsset, toAsset, amount: Number(amount) }
        : { asset: fromAsset, amount: Number(amount), recipient };

    await api.post(endpoint, payload);

    setSuccess(true);
  } catch (err) {
    alert(err.response?.data?.error || "Transaction failed");
  } finally {
    setProcessing(false);
  }
};


  return (
    <div className="exchange-container">
      <header className="page-header">
        <h1>Transfer Hub</h1>

        <div className="tab-switcher">
          <button
            className={activeTab === 'swap' ? 'active' : ''}
            onClick={() => setActiveTab('swap')}
          >
            <Shuffle size={18} /> Swap
          </button>
          <button
            className={activeTab === 'send' ? 'active' : ''}
            onClick={() => setActiveTab('send')}
          >
            <Send size={18} /> Send
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card-glass"
          >
            {/* FROM */}
            <div className="asset-input-box">
              <div className="input-header">
                <span>{activeTab === 'swap' ? 'Pay with' : 'Send from'}</span>
                <span>
                  Balance: {availableFrom} {fromAsset}
                </span>
              </div>

              <div className="input-row">
                <input
                  type="number"
                  value={amount}
                  placeholder="0.00"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <select
                  className="asset-selector"
                  value={fromAsset}
                  onChange={(e) => setFromAsset(e.target.value)}
                >
                  {Object.keys(balances).map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SWITCH */}
            <div className="divider-action">
              <button className="circle-action-btn" onClick={switchAssets}>
                {activeTab === 'swap' ? (
                  <RefreshCcw size={20} />
                ) : (
                  <ArrowDown size={20} />
                )}
              </button>
            </div>

            {/* TO */}
            <div className="asset-input-box">
              <div className="input-header">
                <span>{activeTab === 'swap' ? 'Receive' : 'Recipient'}</span>
              </div>

              <div className="input-row">
                {activeTab === 'swap' ? (
                  <input readOnly value={estimatedOutput} />
                ) : (
                  <input
                    type="text"
                    placeholder="Wallet / Email / Tag"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                )}
                <select
                  className="asset-selector"
                  value={toAsset}
                  onChange={(e) => setToAsset(e.target.value)}
                >
                  {Object.keys(balances).map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="info-box">
              <Info size={16} />
              <p>
                Rate: 1 {fromAsset} ≈ {rate.toFixed(4)} {toAsset}
              </p>
            </div>

            <button
              className="hub-action-btn"
              disabled={
                !amount ||
                Number(amount) > availableFrom ||
                processing ||
                (activeTab === 'send' && !recipient)
              }
              onClick={submitAction}
            >
              {processing ? 'Submitting...' : 'Confirm'}
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="success-view"
          >
            <CheckCircle2 size={80} />
            <h2>Request Submitted</h2>
            <p>Transaction is pending admin approval.</p>
            <button
              className="hub-action-btn"
              onClick={() => {
                setSuccess(false);
                setAmount('');
                setRecipient('');
              }}
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
