import { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import { User, Bell, X, Shield, LogOut, ChevronRight } from "lucide-react";
import "./TopBar.css";
import api from "@/utils/axios";


export default function BeastHeader() {
  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [serverData, setServerData] = useState({ fullName: "User Account", hasUnread: false });
  const navigate = useNavigate();

  // 1. Fetch Header Data on mount (2026 Sync)
  useEffect(() => {
  const fetchHeader = async () => {
    try {
      const res = await api.get("/user/header");
      setServerData(res.data);
    } catch (err) {
      console.error("Header sync failed:", err);
    }
  };

  fetchHeader();
}, []);


  const handleNavigation = (path) => {
    navigate(path);
    setUserOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken"); // Clear session
    navigate("/login");
  };

  return (
    <>
      <header className="beast-header">
        <button className="header-icon-btn profile-trigger" onClick={() => setUserOpen(true)}>
          <User size={22} />
        </button>

        <div className="header-brand">
           <span className="brand-dot"></span>
           <span className="brand-name">SWYFT TRUST</span>
        </div>

        <button className="header-icon-btn" onClick={() => setNotifOpen(true)}>
          <Bell size={22} />
          {/* 2. Badge now shows only if server confirms unread notifs */}
          {serverData.hasUnread && <span className="active-badge"></span>}
        </button>
      </header>

      {(userOpen || notifOpen) && (
        <div className="global-overlay" onClick={() => {setUserOpen(false); setNotifOpen(false);}}>
          
          {/* User Menu */}
          {userOpen && (
            <div className="modern-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-top">
                <div className="user-intro">
                  <div className="avatar-placeholder"><User size={30} /></div>
                  <div>
                    {/* 3. Dynamic Name from Backend */}
                    <h3>{serverData.fullName}</h3>
                    <p>Manage settings & privacy</p>
                  </div>
                </div>
                <button className="close-circle" onClick={() => setUserOpen(false)}><X size={18}/></button>
              </div>

              <div className="modal-links">
                <button onClick={() => handleNavigation("/dashboard/profile")}>
                  <div className="link-icon"><User size={18} /></div>
                  <span>Profile</span>
                  <ChevronRight size={14} className="ml-auto" />
                </button>
                <button onClick={() => handleNavigation("/dashboard/security")}>
                  <div className="link-icon"><Shield size={18} /></div>
                  <span>Security</span>
                  <ChevronRight size={14} className="ml-auto" />
                </button>
                <button className="danger-link" onClick={handleSignOut}>
                  <div className="link-icon"><LogOut size={18} /></div>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* Notification Menu */}
          {notifOpen && (
            <div className="modern-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-top">
                <h3>Notifications</h3>
                <button className="close-circle" onClick={() => setNotifOpen(false)}><X size={18}/></button>
              </div>
              <div className="empty-notif">
                <div className="pulse-icon"><Bell size={32} /></div>
                <p>Everything is quiet...</p>
                <span>We'll let you know when something happens.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
