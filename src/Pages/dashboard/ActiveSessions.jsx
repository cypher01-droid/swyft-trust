import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Monitor, MapPin, Globe, ShieldAlert, LogOut, CheckCircle, XCircle } from 'lucide-react';
import './ActiveSessions.css';

export default function ActiveSessions() {
  const [sessions, setSessions] = useState([
    { id: 1, device: "iPhone 15 Pro", os: "iOS 18.2", location: "New York, USA", ip: "192.168.1.45", current: true, date: "Active Now" },
    { id: 2, device: "MacBook Pro", os: "macOS Sequoia", location: "London, UK", ip: "84.21.190.11", current: false, date: "2 hours ago" },
    { id: 3, device: "Chrome on Windows", os: "Windows 11", location: "Paris, FR", ip: "102.33.1.99", current: false, date: "Jan 05, 2026" }
  ]);

  const [terminating, setTerminating] = useState(null);

  const terminateSession = (id) => {
    setTerminating(id);
    setTimeout(() => {
      setSessions(sessions.filter(s => s.id !== id));
      setTerminating(null);
    }, 1500);
  };

  return (
    <div className="security-page-container">
      <header className="page-header">
        <h1>Active Sessions</h1>
        <p>Manage devices that are currently logged into your account</p>
      </header>

      <div className="sessions-list">
        <h2 className="sub-label">AUTHORIZED DEVICES</h2>
        
        <AnimatePresence>
          {sessions.map((session) => (
            <motion.div 
              key={session.id} 
              className={`session-card ${session.current ? 'current-device' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="device-icon">
                {session.device.includes("iPhone") ? <Smartphone size={24} /> : <Monitor size={24} />}
              </div>

              <div className="session-info">
                <div className="device-name">
                  <h4>{session.device}</h4>
                  {session.current && <span className="current-badge">This Device</span>}
                </div>
                <p className="session-meta">{session.os} • {session.date}</p>
                
                <div className="location-info">
                  <div className="loc-item">
                    <MapPin size={12} /> <span>{session.location}</span>
                  </div>
                  <div className="loc-item">
                    <Globe size={12} /> <span>{session.ip}</span>
                  </div>
                </div>
              </div>

              {!session.current && (
                <button 
                  className="terminate-btn" 
                  onClick={() => terminateSession(session.id)}
                  disabled={terminating === session.id}
                >
                  {terminating === session.id ? "..." : <LogOut size={18} />}
                </button>
              )}
              
              {session.current && (
                <div className="active-check">
                  <CheckCircle size={18} color="var(--success)" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="security-cta-box">
        <ShieldAlert size={24} color="#fcd34d" />
        <div className="cta-content">
          <h4>Don't recognize a device?</h4>
          <p>If you see a login from a location you don't recognize, terminate the session and change your password immediately.</p>
        </div>
      </div>
    </div>
  );
}
