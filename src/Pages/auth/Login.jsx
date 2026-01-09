import { useState } from "react";
import "../../styles/auth.css";
import { signInWithEmailAndPassword, onIdTokenChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🛡️ 2026 Security: Listen for token changes and auto-update localStorage
  // This ensures the dashboard always has a valid token even if it expires
  onIdTokenChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // 2. Force refresh the token to get the latest custom claims (like admin status)
      const idToken = await userCredential.user.getIdToken(true);
      
      // 3. Store securely
      localStorage.setItem("authToken", idToken);

      // 4. 2026 UX: Optional delay to simulate security check
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err) {
      console.error("Login Error:", err);
      // Friendly error mapping for banking users
      const errorMessage = err.code === 'auth/invalid-credential' 
        ? "Invalid email or password. Please try again." 
        : err.message;
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <Link to="/" className="back-home">← Back to Home</Link>
        <div className="brand-header">
           <div className="brand-dot"></div>
           <h2>Sign in to Swyft Trust</h2>
        </div>
        <p className="auth-sub">Secure 256-bit encrypted access</p>

        <form onSubmit={handleLogin}>
          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="auth-row">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button 
            className="auth-btn" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Establishing Secure Connection..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          New to Swyft Trust? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
