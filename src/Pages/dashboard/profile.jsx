import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, FileText, Award, LogOut, Mail, Phone, MapPin, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import './Profile.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Profile sync failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  };

  if (loading) return <div className="loader">Syncing Profile...</div>;
  if (!user) return null;

  return (
    <div className="profile-container">
      <header className="profile-header-main">
        <div className="avatar-wrapper">
          <div className="avatar-circle"><User size={40} /></div>
          {user.kycStatus === "Verified" && (
            <div className="verified-badge-icon">
              <CheckCircle size={18} fill="var(--success)" color="black" />
            </div>
          )}
        </div>
        <h1>{user.name}</h1>
        <p className="account-id">Account ID: {user.accountId}</p>
      </header>

      {/* Account Tier Card */}
      <div className="tier-card-glass">
        <div className="tier-info">
          <Award size={20} color="#fcd34d" />
          <span>Account Tier</span>
          <h4>{user.tier}</h4>
        </div>
        <button className="tier-details-btn">Benefits <ChevronRight size={14}/></button>
      </div>

      {/* Identity & Compliance Section */}
      <section className="profile-section">
        <h2 className="sub-label">IDENTITY & COMPLIANCE</h2>
        <div className="card-glass">
          <div className="kyc-status-row">
            <div className="status-label">
              <ShieldCheck size={20} color={user.kycStatus === 'Verified' ? 'var(--success)' : '#fcd34d'} />
              <span>KYC Verification</span>
            </div>
            <div className={`status-pill ${user.kycStatus.toLowerCase()}`}>{user.kycStatus}</div>
          </div>
          <div className="doc-list-profile">
            {user.uploadedDocs.map((doc, i) => (
              <div key={i} className="doc-item-row">
                <FileText size={16} />
                <span>{doc.name}</span>
                <span className="doc-status">{doc.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="profile-section">
        <h2 className="sub-label">PERSONAL DETAILS</h2>
        <div className="card-glass info-list-card">
          <div className="info-row">
            <Mail size={16} />
            <div className="info-text">
               <span>Email Address</span>
               <p>{user.email}</p>
            </div>
          </div>
          <div className="info-row">
            <Phone size={16} />
            <div className="info-text">
               <span>Phone Number</span>
               <p>{user.phone}</p>
            </div>
          </div>
          <div className="info-row">
            <MapPin size={16} />
            <div className="info-text">
               <span>Primary Residence</span>
               <p>{user.residence}</p>
            </div>
          </div>
        </div>
      </section>

      <button className="logout-btn-full" onClick={handleLogout}>
        <LogOut size={20} />
        <span>Log Out of Swyft Trust</span>
      </button>
      
      <p className="app-version-text">Build 2026.01.08</p>
    </div>
  );
}
