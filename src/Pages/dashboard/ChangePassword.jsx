import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, Key, AlertCircle, CheckCircle2 } from 'lucide-react';
import './ChangePassword.css';

export default function ChangePassword() {
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  // Password Requirements Logic
  const requirements = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains a number", valid: /\d/.test(password) },
    { label: "Special character (@$!%*)", valid: /[@$!%*?&]/.test(password) },
  ];

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    // Simulate secure update
    setTimeout(() => {
      setIsUpdating(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="security-page-container">
      <header className="page-header">
        <h1>Change Password</h1>
        <p>Update your credentials to keep your account safe</p>
      </header>

      {!success ? (
        <motion.div 
          className="card-glass"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form className="security-form" onSubmit={handleUpdate}>
            {/* Current Password */}
            <div className="input-group">
              <label>Current Password</label>
              <div className="pass-input-wrapper">
                <Lock className="input-icon" size={18} />
                <input type="password" placeholder="••••••••" required />
              </div>
            </div>

            {/* New Password */}
            <div className="input-group">
              <label>New Password</label>
              <div className="pass-input-wrapper">
                <Key className="input-icon" size={18} />
                <input 
                  type={showPass ? "text" : "password"} 
                  placeholder="New secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="eye-toggle" 
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Requirements List */}
            <div className="password-checklist">
              {requirements.map((req, i) => (
                <div key={i} className={`check-item ${req.valid ? 'valid' : ''}`}>
                  {req.valid ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  <span>{req.label}</span>
                </div>
              ))}
            </div>

            <div className="security-warning">
              <ShieldCheck size={16} />
              <p>Updating your password will log you out of all other active sessions.</p>
            </div>

            <button 
              type="submit" 
              className="primary-btn" 
              disabled={isUpdating || !requirements.every(r => r.valid)}
            >
              {isUpdating ? "Securing Account..." : "Update Password"}
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          className="success-state"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <div className="glow-icon">
            <ShieldCheck size={60} color="var(--success)" />
          </div>
          <h2>Security Updated</h2>
          <p>Your password has been changed successfully. Use your new credentials for future logins.</p>
          <button className="primary-btn" onClick={() => window.location.href='/dashboard'}>
            Back to Dashboard
          </button>
        </motion.div>
      )}
    </div>
  );
}
