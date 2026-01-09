import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  UserCheck,
  RefreshCcw,
  ArrowDownCircle,
  LogOut
} from "lucide-react";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">

      {/* HEADER NAV */}
      <header className="admin-header">
        <button className="menu-btn" onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
        <h3>Admin</h3>
      </header>

      {/* OVERLAY */}
      {open && <div className="admin-overlay" onClick={() => setOpen(false)} />}

      {/* DRAWER NAV */}
      <aside className={`admin-drawer ${open ? "open" : ""}`}>
        <div className="drawer-top">
          <span>SWYFT ADMIN</span>
          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end onClick={() => setOpen(false)}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/kyc" onClick={() => setOpen(false)}>
            <UserCheck size={18} />
            KYC
          </NavLink>

          <NavLink to="/admin/refunds" onClick={() => setOpen(false)}>
            <RefreshCcw size={18} />
            Refunds
          </NavLink>

          <NavLink to="/admin/withdrawals" onClick={() => setOpen(false)}>
            <ArrowDownCircle size={18} />
            Withdrawals
          </NavLink>
        </nav>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* PAGE CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
}
