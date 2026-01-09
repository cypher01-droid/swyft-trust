import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Coins, ArrowRightLeft, Globe, Network, TrendingUp } from 'lucide-react';
import './MultiWallet.css';

export default function MultiWallet() {
  const assets = [
    { name: "Bitcoin", code: "BTC", balance: "0.045", value: "1,980.50", color: "#f7931a" },
    { name: "Ethereum", code: "ETH", balance: "1.22", value: "2,840.10", color: "#627eea" },
    { name: "Tether", code: "USDT", balance: "450.00", value: "450.00", color: "#26a17b" },
    { name: "US Dollar", code: "USD", balance: "1,240.00", value: "1,240.00", color: "#8b5cf6" }
  ];

  const rates = [
    { pair: "BTC / USD", price: "44,120.50", change: "+2.4%" },
    { pair: "ETH / USD", price: "2,310.12", change: "-0.8%" },
    { pair: "USDT / USD", price: "1.00", change: "0.0%" }
  ];

  return (
    <div className="wallet-container">
      <header className="page-header">
        <h1>Global Wallet</h1>
        <p>Your assets across all supported networks</p>
      </header>

      {/* --- ASSET LIST --- */}
      <div className="asset-scroll-list">
        <h2 className="sub-label">YOUR BALANCES</h2>
        {assets.map((asset, i) => (
          <motion.div 
            key={i} 
            className="asset-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="asset-icon" style={{ background: `${asset.color}20`, color: asset.color }}>
              <Coins size={22} />
            </div>
            <div className="asset-info">
              <h4>{asset.name}</h4>
              <span>{asset.balance} {asset.code}</span>
            </div>
            <div className="asset-value">
              <h4>${asset.value}</h4>
              <p>Equiv. USD</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- EXCHANGE RATES --- */}
      <section className="rates-section">
        <div className="section-header">
          <h2 className="sub-label">MARKET RATES</h2>
          <TrendingUp size={16} color="var(--accent-purple)" />
        </div>
        <div className="card-glass rates-card">
          {rates.map((rate, i) => (
            <div key={i} className="rate-row">
              <span className="pair">{rate.pair}</span>
              <span className="price">${rate.price}</span>
              <span className={`change ${rate.change.startsWith('+') ? 'up' : 'down'}`}>
                {rate.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* --- NETWORK STATUS --- */}
      <section className="network-section">
        <h2 className="sub-label">SUPPORTED NETWORKS</h2>
        <div className="network-grid">
          <div className="network-pill"><Network size={14} /> Bitcoin Mainnet</div>
          <div className="network-pill"><Network size={14} /> Ethereum (ERC20)</div>
          <div className="network-pill"><Network size={14} /> Tron (TRC20)</div>
          <div className="network-pill"><Globe size={14} /> Global Wire (SWIFT)</div>
        </div>
      </section>
    </div>
  );
}
