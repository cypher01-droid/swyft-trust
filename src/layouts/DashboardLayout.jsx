
import { Outlet } from "react-router-dom";
import TopBar from "../Components/TopBar"; // adjust paths as needed
import BottomNav from "../Components/BottomNav";

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <TopBar />
      
      <main className="content">
        {/* This Outlet is where Profile, Stats, etc., will appear */}
        <Outlet /> 
      </main>

      <BottomNav />
    </div>
  );
};

export default DashboardLayout;