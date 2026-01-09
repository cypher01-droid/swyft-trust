import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Bitcoin, Filter } from 'lucide-react';
import './ExchangeRatesPage.css';

export default function ExchangeRatesPage() {
  const [filter, setFilter] = useState('All');
  
  const marketRates = [
    { pair: "BTC / USD", price: "44,120.50", change: "+2.4%", vol: "1.2B" },
    { pair: "ETH / USD", price: "2,310.12", change: "-0.8%", vol: "890M" },
    { pair: "USDT / USD", price: "1.00", change: "0.0%", vol: "4.5B" },
    { pair: "LTC / USD", price: "72.89", change: "+1.1%", vol: "120M" },
    { pair: "EUR / USD", price: "1.083", change: "+0.1%", vol: "FX" },
    { pair: "GBP / USD", price: "1.272", change: "-0.2%", vol: "FX" },
    { pair: "XRP / USD", price: "0.551", change: "+4.2%", vol: "50M" },
  ];

  return (
    <div className="rates-page-container">
      <header className="page-header">
        <h1>Live Rates</h1>
        <p>Real-time exchange data</p>
      </header>

      <div className="filter-bar">
          <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
          <button className={filter === 'Crypto' ? 'active' : ''} onClick={() => setFilter('Crypto')}><Bitcoin size={16}/> Crypto</button>
          <button className={filter === 'Fiat' ? 'active' : ''} onClick={() => setFilter('Fiat')}><DollarSign size={16}/> Fiat</button>
      </div>

      <div className="rates-table-header">
          <span>Pair</span>
          <span>Price (USD)</span>
          <span className="change-header">Change (24h)</span>
      </div>

      <div className="rates-list">
        {marketRates.map((rate, i) => (
          <motion.div 
            key={i} 
            className="rate-item"
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <span className="pair">{rate.pair}</span>
            <span className="price">${rate.price}</span>
            <span className={`change ${rate.change.startsWith('+') ? 'up' : 'down'}`}>
              <TrendingUp size={14}/> {rate.change}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
