import { useState } from "react";
import "../../styles/auth.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate(); // ✅ Add this
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard"); // <-- redirect
    } catch (err) {
      console.error(err);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <Link to="/" className="back-home">← Back to Home</Link>
        <h2>Sign in to Swyft Trust</h2>
        <p className="auth-sub">Secure access to your banking dashboard</p>

        <form onSubmit={handleLogin}>
          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}               // use email state
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}            // use password state
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-row">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="auth-btn" type="submit">Sign In</button>
        </form>

        <p className="auth-footer">
          New to Swyft Trust? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
