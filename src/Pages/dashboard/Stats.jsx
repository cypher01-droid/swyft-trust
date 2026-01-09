import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Wallet,
  PieChart,
  Loader2
} from 'lucide-react';
import axios from '@/utils/axios';
import './Stats.css';

export default function StatsDashboard() {
  const [timeframe, setTimeframe] = useState('90d');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/user/stats?range=${timeframe}`);
        setStats(res.data);
      } catch (err) {
        console.error('Stats fetch failed');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [timeframe]);

  if (loading) {
    return (
      <div className="stats-loader">
        <Loader2 className="spin" size={32} />
        <p>Loading analytics…</p>
      </div>
    );
  }

  if (!stats) return null;

  const totalAllocation = Object.values(stats.allocation).reduce(
    (a, b) => a + Math.abs(b),
    0
  );

  return (
    <div className="stats-container">
      <header className="page-header">
        <h1>Financial Overview</h1>
        <p>Read-only analytics of your account</p>
      </header>

      {/* TIMEFRAME */}
      <div className="timeframe-selector">
        <button
          className={timeframe === '30d' ? 'active' : ''}
          onClick={() => setTimeframe('30d')}
        >
          30 Days
        </button>
        <button
          className={timeframe === '90d' ? 'active' : ''}
          onClick={() => setTimeframe('90d')}
        >
          90 Days
        </button>
      </div>

      {/* BALANCE HISTORY */}
      <motion.div className="card-glass" whileHover={{ y: -4 }}>
        <div className="card-header">
          <Activity size={18} />
          <h3>Balance Activity</h3>
        </div>
        <div className="chart-placeholder">
          <TrendingUp size={56} />
          <p>Chart integration ready</p>
          <small>({stats.balanceHistory.length} records)</small>
        </div>
      </motion.div>

      {/* METRICS */}
      <div className="metric-grid">
        <div className="metric-card deposit">
          <TrendingUp />
          <h4>${stats.deposits.toLocaleString()}</h4>
          <span>Total Deposits</span>
        </div>

        <div className="metric-card withdraw">
          <TrendingDown />
          <h4>${stats.withdrawals.toLocaleString()}</h4>
          <span>Total Withdrawals</span>
        </div>

        <div className="metric-card available">
          <Wallet />
          <h4>${stats.available.toLocaleString()}</h4>
          <span>Available Balance</span>
        </div>

        <div className="metric-card pending">
          <Wallet />
          <h4>${stats.pending.toLocaleString()}</h4>
          <span>Pending Balance</span>
        </div>
      </div>

      {/* ALLOCATION */}
      <motion.div className="card-glass" whileHover={{ y: -4 }}>
        <div className="card-header">
          <PieChart size={18} />
          <h3>Asset Allocation</h3>
        </div>

        <div className="allocation-list">
          {Object.entries(stats.allocation).map(([asset, value]) => (
            <div key={asset} className="asset-row">
              <span className="asset-name">{asset}</span>
              <div className="bar-wrap">
                <div
                  className="bar"
                  style={{
                    width: `${(Math.abs(value) / totalAllocation) * 100}%`
                  }}
                />
              </div>
              <span className="asset-value">
                ${Math.abs(value).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
