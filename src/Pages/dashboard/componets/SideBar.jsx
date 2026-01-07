import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Swyft Trust</h2>

      <nav>
        <NavLink to="/dashboard" end>Overview</NavLink>
        <NavLink to="/dashboard/balances">Balances</NavLink>
        <NavLink to="/dashboard/loans">Loans</NavLink>
        <NavLink to="/dashboard/refunds">Refunds</NavLink>
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}
