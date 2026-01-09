import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bitcoin, CreditCard, ArrowRight, Copy, Loader2 } from 'lucide-react';
import './DepositPage.css';
import { QRCodeGenerator } from './QRCodeGenerator';
import api from "@/utils/axios";


export default function DepositPage() {
  const navigate = useNavigate();
  const [methodType, setMethodType] = useState('crypto'); 
  const [selectedCrypto, setSelectedCrypto] = useState('BTC_BTC');
  const [depositAmount, setDepositAmount] = useState('');
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProceed = async () => {
  if (!depositAmount || parseFloat(depositAmount) <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  setLoading(true);
  try {
    const { data } = await api.post("/transaction/deposit", {
      amount: depositAmount,
      methodType,
      currency: methodType === 'crypto'
        ? selectedCrypto.split('_')[0]
        : 'USD',
      network: selectedCrypto
    });

    setAdminDetails(data.adminDetails);
    setIsDetailsVisible(true);

  } catch (err) {
    console.error("Deposit error:", err);
    alert(err.response?.data?.error || "Failed to initiate deposit");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="deposit-page-container">
      <header className="page-header">
        <h1>Deposit Funds</h1>
        <p>Choose your method to add balance</p>
      </header>

      {!isDetailsVisible ? (
        <div className="card-glass deposit-form-card">
          <div className="method-switcher">
            <button className={methodType === 'crypto' ? 'active' : ''} onClick={() => setMethodType('crypto')}>
              <Bitcoin size={18}/> Crypto
            </button>
            <button className={methodType === 'fiat' ? 'active' : ''} onClick={() => setMethodType('fiat')}>
              <CreditCard size={18}/> Fiat/Bank
            </button>
          </div>

          <div className="input-group">
            <label>Amount</label>
            <input 
                type="number" 
                placeholder="0.00" 
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
            />
          </div>

          {methodType === 'crypto' ? (
            <div className="input-group">
              <label>Select Currency & Network</label>
              <select value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)}>
                <option value="BTC_BTC">Bitcoin (BTC) - Network: BTC</option>
                <option value="ETH_ERC20">Ethereum (ETH) - Network: ERC20</option>
                <option value="USDT_TRC20">Tether (USDT) - Network: TRC20</option>
              </select>
            </div>
          ) : (
            <div className="input-group">
                <label>Select Local Currency & Method</label>
                <select>
                    <option value="USD_ZELLE">USD ($) - Zelle/Wire</option>
                    <option value="EUR_SEPA">EUR (€) - SEPA Transfer</option>
                </select>
            </div>
          )}

          <button className="submit-deposit-btn" onClick={handleProceed} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <>Proceed to Details <ArrowRight size={18}/></>}
          </button>
        </div>
      ) : (
        <div className="card-glass deposit-confirmation-card">
            <h3>Deposit Instructions</h3>
            {adminDetails?.address ? (
                <div className="crypto-details">
                    <p>Send <strong>{adminDetails.amount} {adminDetails.currency}</strong> to the address below:</p>
                    <div className="qr-box-center">
                        <QRCodeGenerator value={adminDetails.address} size={160} />
                    </div>
                    <div className="address-display">
                        <span>{adminDetails.address}</span>
                        <button onClick={() => navigator.clipboard.writeText(adminDetails.address)}><Copy size={16}/></button>
                    </div>
                    <p className="note-text">⚠️ Deposits appear in your Pending Balance after 3 network confirmations.</p>
                </div>
            ) : (
                <div className="fiat-details">
                    <p>Request received for {adminDetails?.method}.</p>
                    <p className="note-text">{adminDetails?.instructions}</p>
                </div>
            )}
            
            <button className="submit-deposit-btn" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
            </button>
        </div>
      )}
    </div>
  );
}
