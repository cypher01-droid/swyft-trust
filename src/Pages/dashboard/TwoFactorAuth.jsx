import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Smartphone, Key, Copy, CheckCircle2, AlertTriangle, ArrowRight, Lock } from 'lucide-react';
import { QRCodeGenerator } from './QRCodeGenerator'; 
import './TwoFactorAuth.css';

export default function TwoFactorAuth() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const secretKey = "JBSWY3DPEHPK3PXP"; // Mock 2FA Secret

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    // Simulate server-side TOTP validation
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="security-page-container">
      <header className="page-header">
        <h1>Two-Factor Auth</h1>
        <p>Add an extra layer of protection to your assets</p>
      </header>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            
            {/* STEP 1: INITIAL CHOICE */}
            {step === 1 && (
              <div className="card-glass intro-card">
                <div className="security-illustration">
                  <div className="shield-ring">
                    <Smartphone size={32} color="var(--accent-purple)" />
                  </div>
                </div>
                <h3>Authenticator App</h3>
                <p>Use apps like Google Authenticator or Authy to generate secure, one-time codes.</p>
                <div className="security-badge-small">
                  <ShieldCheck size={14} /> Recommended for High Security
                </div>
                <button className="primary-btn" onClick={() => setStep(2)}>
                  Setup Authenticator <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 2: SCAN & KEY */}
            {step === 2 && (
              <div className="card-glass setup-card">
                <div className="setup-instructions">
                  <span className="step-count">1</span>
                  <p>Scan this QR code in your Authenticator app.</p>
                </div>
                
                <div className="qr-box-container">
                  <QRCodeGenerator value={`otpauth://totp/NexusBank?secret=${secretKey}`} size={180} />
                </div>

                <div className="setup-instructions">
                  <span className="step-count">2</span>
                  <p>Or enter this secret key manually:</p>
                </div>

                <div className="manual-key-box">
                  <code>{secretKey}</code>
                  <button onClick={() => navigator.clipboard.writeText(secretKey)}>
                    <Copy size={16} />
                  </button>
                </div>

                <button className="primary-btn" onClick={() => setStep(3)}>Next Step</button>
              </div>
            )}

            {/* STEP 3: VERIFY CODE */}
            {step === 3 && (
              <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="card-glass verify-card">
                <div className="setup-instructions">
                   <Lock size={20} color="var(--accent-purple)" />
                   <p>Enter the 6-digit code from your app to confirm.</p>
                </div>

                <form onSubmit={handleVerify}>
                  <input 
                    type="text" 
                    className="otp-input"
                    placeholder="000 000"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <div className="warning-box">
                    <AlertTriangle size={16} />
                    <span>Ensure your device time is set to automatic.</span>
                  </div>
                  <button type="submit" className="primary-btn" disabled={isVerifying || otp.length < 6}>
                    {isVerifying ? "Verifying..." : "Enable 2FA"}
                  </button>
                </form>
              </motion.div>
            )}

          </motion.div>
        ) : (
          /* SUCCESS SCREEN */
          <motion.div className="success-state" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <div className="glow-circle">
              <CheckCircle2 size={60} color="var(--success)" />
            </div>
            <h2>2FA Enabled</h2>
            <p>Your account is now secured with two-factor authentication. You will be asked for a code whenever you log in or withdraw.</p>
            <div className="recovery-notice">
               <strong>Important:</strong> Keep your recovery codes safe. If you lose your device, you may lose access to your funds.
            </div>
            <button className="primary-btn" onClick={() => window.location.href='/dashboard'}>
              Return to Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
