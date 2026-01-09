import { NavLink } from "react-router-dom";
import { Home, BarChart3, LayoutGrid, CreditCard, User } from "lucide-react";
import "./BottomTabs.css";

export default function BottomNav() {
  return (
    <div className="nav-container">
      <nav className="bottom-nav">
        {/* end prop ensures Home is only active at /dashboard exactly */}
        <NavLink to="/dashboard" end className="nav-item">
          <Home size={24} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/dashboard/stats" className="nav-item">
          <BarChart3 size={24} />
          <span>Stats</span>
        </NavLink>

        {/* Center Floating Action Button */}
        <div className="center-wrapper">
          <NavLink to="/dashboard/menu" className="nav-item center-btn">
            <LayoutGrid size={28} color="white" />
          </NavLink>
        </div>

        <NavLink to="/dashboard/cards" className="nav-item">
          <CreditCard size={24} />
          <span>Cards</span>
        </NavLink>

        <NavLink to="/dashboard/profile" className="nav-item">
          <User size={24} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}
