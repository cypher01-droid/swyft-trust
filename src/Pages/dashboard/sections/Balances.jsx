import { useState, useEffect } from "react";
import "./Balances.css";

export default function Balances() {
  const [user, setUser] = useState(null);
  const [balances, setBalances] = useState({ bank: 0, loan: 0, refund: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Placeholder for now; replace with Firebase fetch later
    const fakeUser = {
      uid: "UID12345678",
      fullName: "Jane Doe",
      phone: "+237 699 123 456",
    };
    setUser(fakeUser);
    setBalances({ bank: 3200, loan: 1500, refund: 250 });
    setTransactions([
      { id: 1, date: "2026-01-06", type: "Deposit", amount: 200 },
      { id: 2, date: "2026-01-05", type: "Withdrawal", amount: 100 },
      { id: 3, date: "2026-01-04", type: "Refund", amount: 50 },
    ]);
  }, []);

  const handleDeposit = (type) => alert(`Deposit to ${type} clicked!`);
  const handleWithdraw = (type) => alert(`Withdraw from ${type} clicked!`);
  const handleTransfer = (type) => alert(`Transfer from ${type} clicked!`);

  if (!user) return <p>Loading user data...</p>;

  const balanceTypes = [
    { label: "Bank Balance", key: "bank" },
    { label: "Loan Balance", key: "loan" },
    { label: "Refund Balance", key: "refund" },
  ];

  return (
    <div className="balances-page">
      <h2>Your Balances</h2>
      <div className="balances-container">
        {balanceTypes.map((b) => (
          <div key={b.key} className="balance-card-wrapper">
            {/* SVG Credit Card */}
            <svg viewBox="0 0 400 250" className="credit-card">
  <defs>
    <linearGradient id={`grad-${b.key}`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#4B0082"/>
      <stop offset="50%" stopColor="#6D28D9"/>
      <stop offset="100%" stopColor="#8B5CF6"/>
    </linearGradient>

    <radialGradient id={`shine-${b.key}`} cx="0.8" cy="0.2" r="0.5">
      <stop offset="0%" stopColor="rgba(255,255,255,0.4)"/>
      <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>

  {/* Main card rectangle */}
  <rect width="400" height="250" rx="20" fill={`url(#grad-${b.key})`} />

  {/* Card shine */}
  <rect width="400" height="250" rx="20" fill={`url(#shine-${b.key})`} />

  {/* Chip */}
  <rect x="20" y="40" width="60" height="40" rx="6" fill="#FFD700" />
  <circle cx="45" cy="60" r="6" fill="#FFA500" />

  {/* Bank Name */}
  <text x="20" y="30" fill="#fff" fontSize="18" fontWeight="700" fontFamily="sans-serif">
    Swyft Trust
  </text>

  {/* Card Number (masked) */}
  <text x="20" y="120" fill="#fff" fontSize="20" fontFamily="monospace" letterSpacing="4">
    **** **** **** 1234
  </text>

  {/* User Name */}
  <text x="20" y="160" fill="#fff" fontSize="16" fontWeight="600">
    {user.fullName}
  </text>

  {/* Phone */}
  <text x="20" y="185" fill="#eee" fontSize="14">
    {user.phone}
  </text>

  {/* Balance */}
  <text x="280" y="80" fill="#fff" fontSize="28" fontWeight="bold" textAnchor="end">
    ${balances[b.key] ?? 0}
  </text>

  {/* UID */}
  <text x="280" y="200" fill="#ccc" fontSize="12" textAnchor="end">
    UID: {user.uid}
  </text>
</svg>


            {/* Action Buttons */}
            <div className="balance-actions">
              <button onClick={() => handleDeposit(b.key)}>Deposit</button>
              <button onClick={() => handleWithdraw(b.key)}>Withdraw</button>
              <button onClick={() => handleTransfer(b.key)}>Transfer</button>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions & Chart */}
      <div className="dashboard-bottom">
        <div className="transactions">
          <h3>Recent Transactions</h3>
          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <ul>
              {transactions.map((t) => (
                <li key={t.id}>
                  {t.date} — {t.type}: ${t.amount}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="chart">
          <h3>Balance Chart</h3>
          <p>[Chart placeholder]</p>
        </div>
      </div>
    </div>
  );
}
