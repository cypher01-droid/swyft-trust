// src/dashboard/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./componets/SideBar";
import TopBar from "./componets/TopBar";
import "./dashboard.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <TopBar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
