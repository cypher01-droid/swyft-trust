import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";

import DashboardLayout from "./Pages/dashboard/DashboardLayout";
import DashboardHome from "./Pages/dashboard/DashboardHome";

import Balances from "./Pages/dashboard/sections/Balances";
import Loans from "./Pages/dashboard/sections/Loans";
import Refunds from "./Pages/dashboard/sections/Refunds";
import Settings from "./Pages/dashboard/sections/Settings";
import KYCStatus from "./Pages/dashboard/sections/KYCStatus";
import Transactions from "./Pages/dashboard/sections/Transactions";
import Notifications from "./Pages/dashboard/sections/Notifications";

import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
  <PrivateRoute>
    <DashboardLayout />
  </PrivateRoute>
}>
  <Route index element={<DashboardHome />} />
  <Route path="balances" element={<Balances />} />
  <Route path="loans" element={<Loans />} />
  <Route path="refunds" element={<Refunds />} />
  <Route path="settings" element={<Settings />} />
  <Route path="kyc" element={<KYCStatus />} />
  <Route path="transactions" element={<Transactions />} />
  <Route path="notifications" element={<Notifications />} />
</Route>
      </Routes>
    </BrowserRouter>
  );
}
