import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Briefcase, Car, Home, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import axios from '@/utils/axios'; // your axios instance
import './LoanRequest.css';

export default function LoanRequest() {
  const [loanType, setLoanType] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  const [form, setForm] = useState({
    amount: '',
    monthlyIncome: '',
    businessReg: '',
    annualRevenue: '',
    vehicle: '',
    vehicleCondition: '',
    propertyAddress: '',
    downPayment: ''
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post('/loan/request', {
        loanType,
        ...form
      });

      setRefCode(res.data.refCode);
      setSubmitted(true);
    } catch (err) {
      alert('Failed to submit loan request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="loan-request-container">
      <header className="page-header">
        <h1>Request Loan</h1>
        <p>Choose a plan tailored to your financial goals</p>
      </header>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <>
            {step === 1 && (
              <div className="loan-type-grid">
                {[
                  { id: 'personal', label: 'Personal Loan', icon: <Zap /> },
                  { id: 'business', label: 'Business Expansion', icon: <Briefcase /> },
                  { id: 'auto', label: 'Auto Finance', icon: <Car /> },
                  { id: 'mortgage', label: 'Home Equity', icon: <Home /> }
                ].map(opt => (
                  <button
                    key={opt.id}
                    className={`loan-type-card ${loanType === opt.id ? 'selected' : ''}`}
                    onClick={() => setLoanType(opt.id)}
                  >
                    {opt.icon}
                    <h4>{opt.label}</h4>
                  </button>
                ))}

                <button className="primary-btn wide" disabled={!loanType} onClick={() => setStep(2)}>
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <motion.form className="card-glass loan-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Amount Requested</label>
                  <input name="amount" type="number" onChange={handleChange} required />
                </div>

                <div className="input-group">
                  <label>Monthly Income</label>
                  <input name="monthlyIncome" type="number" onChange={handleChange} required />
                </div>

                {loanType === 'business' && (
                  <>
                    <input name="businessReg" placeholder="Business Reg No" onChange={handleChange} />
                    <input name="annualRevenue" placeholder="Annual Revenue" onChange={handleChange} />
                  </>
                )}

                {loanType === 'auto' && (
                  <>
                    <input name="vehicle" placeholder="Vehicle" onChange={handleChange} />
                    <select name="vehicleCondition" onChange={handleChange}>
                      <option>New</option>
                      <option>Used</option>
                    </select>
                  </>
                )}

                {loanType === 'mortgage' && (
                  <>
                    <input name="propertyAddress" placeholder="Property Address" onChange={handleChange} />
                    <input name="downPayment" type="number" placeholder="Down Payment" onChange={handleChange} />
                  </>
                )}

                <div className="security-info">
                  <ShieldCheck size={16} />
                  <span>Encrypted & manually reviewed</span>
                </div>

                <button className="primary-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting…' : 'Submit Application'}
                </button>
              </motion.form>
            )}
          </>
        ) : (
          <motion.div className="success-screen">
            <Landmark size={60} />
            <h2>Application Submitted</h2>
            <p>Reference Code</p>
            <code>{refCode}</code>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
