import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownLeft, ArrowUpRight, Shuffle, Send,
  ChevronRight, CheckCircle2,
  Clock, AlertCircle, Calendar, Hash, CreditCard
} from 'lucide-react';
import './HistoryPage.css';
import api from "@/utils/axios";


export default function HistoryPage() {
  const [filter, setFilter] = useState('All');
  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const { data } = await api.get("/transaction/history", {
        params: { status: filter }
      });

      setTransactions(data.transactions || []);
    } catch (err) {
      console.error("History fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchHistory();
}, [filter]);


  if (loading) return <div className="loader">Loading activity…</div>;

  return (
    <div className="history-container">
      <header className="page-header">
        <h1>Activity</h1>
        <div className="filter-scroll">
          {['All', 'Completed', 'Pending', 'Failed'].map(f => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="transaction-list">
        {transactions.map(tx => (
          <motion.div
            key={tx.id}
            className="history-item"
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedTx(tx)}
          >
            <div className={`icon-box ${tx.type.toLowerCase()}`}>
              {tx.type === 'Deposit' && <ArrowDownLeft />}
              {tx.type === 'Withdraw' && <ArrowUpRight />}
              {tx.type === 'Swap' && <Shuffle />}
              {tx.type === 'Send' && <Send />}
            </div>

            <div className="tx-info">
              <h4>{tx.type}</h4>
              <p>{tx.date}</p>
            </div>

            <div className="tx-val">
              <h4 className={tx.type === 'Deposit' ? 'plus' : ''}>
                {tx.type === 'Deposit' ? '+' : '-'}
                {tx.amount.toLocaleString()} {tx.asset}
              </h4>
              <span className={`status-pill ${tx.status.toLowerCase()}`}>
                {tx.status}
              </span>
            </div>
            <ChevronRight size={16} />
          </motion.div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      <AnimatePresence>
        {selectedTx && (
          <div className="global-overlay" onClick={() => setSelectedTx(null)}>
            <motion.div
              className="modern-modal tx-detail-modal"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3>Transaction Details</h3>

              <div className="detail-amount">
                <span>
                  {selectedTx.amount} {selectedTx.asset}
                </span>
                <p className={`status-badge ${selectedTx.status.toLowerCase()}`}>
                  {selectedTx.status === 'Completed'
                    ? <CheckCircle2 size={14} />
                    : <Clock size={14} />}
                  {selectedTx.status}
                </p>
              </div>

              <div className="detail-grid">
                <div><Hash /> {selectedTx.id}</div>
                <div><Calendar /> {selectedTx.date}</div>
                <div><CreditCard /> {selectedTx.method}</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
