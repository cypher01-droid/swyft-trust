import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const isValidAdmin =
        (form.identifier === "admin" ||
          form.identifier === "admin@swyfttrust.com") &&
        form.password === "m@123manager**+";

      if (!isValidAdmin) {
        setError("Invalid admin credentials");
        setLoading(false);
        return;
      }

      // store admin session
      localStorage.setItem("admin_auth", "true");

      navigate("/admin");
    }, 1200);
  };

  return (
    <div className="admin-login-container">
      <motion.form
        onSubmit={handleSubmit}
        className="admin-login-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="admin-login-icon">
          <ShieldCheck size={40} />
        </div>

        <h2>Admin Access</h2>
        <p>Restricted control panel</p>

        {error && <div className="error-box">{error}</div>}

        <div className="input-group">
          <User size={16} />
          <input
            type="text"
            name="identifier"
            placeholder="Username or Email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <Lock size={16} />
          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            onChange={handleChange}
            required
          />
        </div>

        <button className="primary-btn" disabled={loading}>
          {loading ? "Authenticating..." : "Login as Admin"}
        </button>
      </motion.form>
    </div>
  );
}
