import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import { DollarSign, Clock, ListChecks, ArrowUpRight, ArrowDownLeft, Shuffle, CheckCircle, AlertCircle, X, Zap, CreditCard, Landmark, Menu } from 'lucide-react';
import './DashboardHome.css'; 
import { QRCodeGenerator } from './QRCodeGenerator'; 
import api from "@/utils/axios";


export default function DashboardHome() {
  const navigate = useNavigate(); 

  // --- Real-time State ---
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  // --- Fetch Data from Node.js Backend ---
  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/user/dashboard");
      setUserData(data);
    } catch (err) {
      console.error("Session expired or unauthorized", err);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, [navigate]);


  if (loading) return <div className="loader">Securing Connection...</div>;
  if (!userData) return null;

  // --- Derived Data ---
  const walletAddressBTC = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"; // Keep for now or fetch from backend
  const availableBalance = userData.balances[currency]?.available || 0;
  const pendingBalance = userData.balances[currency]?.pending || 0;
  const totalTransactions = userData.recentActivity.length;

  const handleActionClick = (actionType) => {
    if (actionType === 'deposit') setIsReceiveModalOpen(true);
    if (actionType === 'withdraw' || actionType === 'send') setIsSendModalOpen(true);
    if (actionType === 'swap') navigate('/dashboard/menu'); 
  };
  
  return (
    <div className="dashboard-home-container">
      <header className="home-header">
        <h1>Welcome back, {userData.fullName.split(' ')[0]}</h1>
        <p className="balance-label">Available {currency} Balance</p>
        <div className="main-balance">
          <motion.div 
            className="balance-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="balance-header">
                <DollarSign size={20} color="white" />
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="currency-select">
                    <option value="USD">USD ($)</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="USDT">USDT</option>
                </select>
            </div>
            <h2 className="balance-amount">
                {currency === 'USD' ? `$${availableBalance.toFixed(2)}` : `${availableBalance} ${currency}`}
            </h2>
          </motion.div>
        </div>
      </header>

      <div className="quick-actions">
        <button onClick={() => handleActionClick('deposit')}><ArrowDownLeft size={20} /> Receive</button>
        <button onClick={() => handleActionClick('send')}><ArrowUpRight size={20} /> Send</button>
        <button onClick={() => handleActionClick('swap')}><Shuffle size={20} /> Swap</button>
      </div>

      <div className="metric-grid">
        <motion.div className="metric-card" whileHover={{ translateY: -5 }}>
          <Clock size={20} color="#fcd34d" />
          <p>Pending {currency}</p>
          <span>{currency === 'USD' ? `$${pendingBalance.toFixed(2)}` : `${pendingBalance} ${currency}`}</span>
        </motion.div>
        
        <motion.div className="metric-card" whileHover={{ translateY: -5 }}>
          <ListChecks size={20} color="#60a5fa" />
          <p>Total Transactions</p>
          <span>{totalTransactions}</span>
        </motion.div>
      </div>

      <div className="history-section">
        <h3>Recent Activity</h3>
        <div className="transaction-list">
          {userData.recentActivity.map((tx) => (
            <motion.div key={tx.id} className="transaction-item" whileTap={{ scale: 0.98 }}>
              <div className={`icon-bg ${tx.type.toLowerCase()}`}>
                {tx.type === 'Deposit' && <ArrowDownLeft size={18} />}
                {tx.type === 'Withdrawal' && <ArrowUpRight size={18} />}
                {tx.type === 'Swap' && <Shuffle size={18} />}
              </div>
              <div className="tx-details">
                <p>{tx.type}</p>
                <span>{tx.method || tx.currency}</span>
              </div>
              <div className="tx-status">
                <span className={`status ${tx.status.toLowerCase()}`}>
                    {tx.status === 'Completed' ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
                    {tx.status}
                </span>
                <p className="tx-amount">{tx.amount}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RECEIVE MODAL */}
      {isReceiveModalOpen && (
        <div className="global-overlay" onClick={() => setIsReceiveModalOpen(false)}>
          <div className="modern-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h3>Receive Crypto</h3>
              <button className="close-circle" onClick={() => setIsReceiveModalOpen(false)}><X size={18}/></button>
            </div>
            <div className="modal-body">
              <select className="input-field" defaultValue="BTC_BTC">
                <option value="BTC_BTC">Bitcoin (BTC) - Network: BTC</option>
                <option value="ETH_ERC20">Ethereum (ETH) - Network: ERC20</option>
              </select>
              <div className="qr-container" style={{background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center'}}>
                <QRCodeGenerator value={walletAddressBTC} size={180} />
                <p style={{color: 'black', fontSize: '10px', marginTop: '10px', wordBreak: 'break-all'}}>{walletAddressBTC}</p>
                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(walletAddressBTC)}>Copy</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEND MODAL */}
      {isSendModalOpen && (
        <div className="global-overlay" onClick={() => setIsSendModalOpen(false)}>
          <div className="modern-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h3>Send Funds</h3>
              <button className="close-circle" onClick={() => setIsSendModalOpen(false)}><X size={18}/></button>
            </div>
            <div className="modal-body">
              <div className="payment-methods-list">
                <button className="method-item" onClick={() => navigate('/withdraw/zelle')}><Zap size={20} color="#9d50ff"/> Zelle</button>
                <button className="method-item" onClick={() => navigate('/withdraw/cashapp')}><CreditCard size={20} color="#9d50ff"/> CashApp</button>
                <button className="method-item" onClick={() => navigate('/withdraw/wire')}><Landmark size={20} color="#9d50ff"/> Wire Transfer</button>
                <button className="method-item more-methods"><Menu size={20}/> More Methods</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
