import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import CheckStatus from "./Pages/CheckStatus"; // New location
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./Pages/dashboard/DashboardHome";
import Stats from "./Pages/dashboard/Stats";
import Menu from "./Pages/dashboard/Menu";
import Cards from "./Pages/dashboard/cards";
import Profile from "./Pages/dashboard/profile";
import DepositPage from "./Pages/dashboard/DepositPage";
import WithdrawPage from "./Pages/dashboard/WithdrawPage";
import ExchangeHub from "./Pages/dashboard/ExchangeHub";
import HistoryPage from "./Pages/dashboard/HistoryPage";
import RefundTracking from "./Pages/dashboard/RefundTracking";
import LoanTracking from "./Pages/dashboard/LoanTracking";
import LoanRequest from "./Pages/dashboard/LoanRequest";
import MultiWallet from "./Pages/dashboard/MultiWallet";
import ExchangeRatesPage from "./Pages/dashboard/ExchangeRatesPage";
import KYCPage from "./Pages/dashboard/KYCPage";
import ChangePassword from "./Pages/dashboard/ChangePassword";
import TwoFactorAuth from "./Pages/dashboard/TwoFactorAuth";
import ActiveSessions from "./Pages/dashboard/ActiveSessions";
import RequestRefund from "./Pages/dashboard/RefundRequest";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminProtected from "./routes/AdminProtected";
import AdminDashboard from "./admin/AdminDashboard";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public & Auth */}
        <Route path="/" element={<Home />} />
        <Route path="/check-status" element={<CheckStatus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
  path="/admin"
  element={
    <AdminProtected>
      <AdminLayout />
    </AdminProtected>
  }
>
<Route index element={<AdminDashboard />} />
</Route>

        {/* Dashboard - FIXED NESTING */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />  {/* matches /dashboard */}
          <Route path="stats" element={<Stats />} />    {/* matches /dashboard/stats */}
          <Route path="menu" element={<Menu />} />      {/* matches /dashboard/menu */}
          <Route path="cards" element={<Cards />} />    {/* matches /dashboard/cards */}
          <Route path="profile" element={<Profile />} />
          <Route path="deposit" element={<DepositPage />} />
          <Route path="withdraw" element={<WithdrawPage />} />
          <Route path="send" element={<ExchangeHub />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="refund-request" element={<RequestRefund />} />
          <Route path="refund" element={<RefundTracking />} />
          <Route path="loan" element={<LoanTracking />} />
          <Route path="request-loan" element={<LoanRequest />} />
          <Route path="wallet" element={<MultiWallet />} />
          <Route path="rates" element={<ExchangeRatesPage />} />
          <Route path="kyc" element={<KYCPage />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="2fa" element={<TwoFactorAuth />} />
          <Route path="sessions" element={<ActiveSessions />} />{/* matches /dashboard/profile */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}