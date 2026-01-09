import "./AdminDashboard.css";
import { UserCheck, RefreshCcw, ArrowDownCircle, DollarSign } from "lucide-react";

export default function AdminDashboardHome() {
  return (
    <div className="admin-dashboard">

      <h2>Overview</h2>

      <div className="admin-cards">
        <div className="admin-card">
          <UserCheck />
          <span>KYC Pending</span>
          <strong>12</strong>
        </div>

        <div className="admin-card">
          <RefreshCcw />
          <span>Refund Requests</span>
          <strong>4</strong>
        </div>

        <div className="admin-card">
          <ArrowDownCircle />
          <span>Withdrawals</span>
          <strong>7</strong>
        </div>

        <div className="admin-card">
          <DollarSign />
          <span>Total Volume</span>
          <strong>$42k</strong>
        </div>
      </div>

    </div>
  );
}
