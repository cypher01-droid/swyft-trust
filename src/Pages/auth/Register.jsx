import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Optimized imports
import "./Signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Removed direct 'db' import to enforce backend security
import { uploadToImgBB } from "../../utils/imgbb";
import api from "@/utils/axios";


export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    idFile: null,
    addressFile: null,
  });

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true immediately

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!form.idFile || !form.addressFile) {
      alert("Please upload required verification documents.");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Upload KYC images to ImgBB (Frontend Utility)
      const idURL = await uploadToImgBB(form.idFile);
      const addressURL = await uploadToImgBB(form.addressFile);

      // 2️⃣ Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCredential.user.uid;

      // 3️⃣ 🚀 CONNECT TO BACKEND (Node.js/Express)
      // This replaces the old direct Firestore 'setDoc' call
  await api.post("/user/register", {
  uid,
  email: form.email,
  fullName: form.fullName,
  phone: form.phone,
  kycDocs: {
    idDocument: idURL,
    addressProof: addressURL,
  }
});


      if (!response.ok) {
        throw new Error("Backend failed to initialize banking ledger.");
      }

      alert("Registration successful! Welcome to Swyft Trust.");
      navigate("/dashboard");

    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <Link to="/" className="back-home">← Back to Home</Link>

        <div className="progress">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className={`dot ${step >= n ? "active" : ""}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <h2>Create Account</h2>
              <input name="fullName" placeholder="Full Name" required onChange={handleChange} />
              <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
              <button type="button" onClick={next}>Continue</button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Personal Details</h2>
              <input name="phone" placeholder="Phone Number" required onChange={handleChange} />
              <div className="nav-buttons">
                <button type="button" className="ghost" onClick={prev}>Back</button>
                <button type="button" onClick={next}>Continue</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Security Setup</h2>
              <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
              <div className="nav-buttons">
                <button type="button" className="ghost" onClick={prev}>Back</button>
                <button type="button" onClick={next}>Continue</button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2>Review & Submit</h2>
              <div className="review">
                <p><strong>Name:</strong> {form.fullName}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Phone:</strong> {form.phone}</p>
              </div>
              <div className="nav-buttons">
                <button type="button" className="ghost" onClick={prev}>Back</button>
                <button type="submit" disabled={loading}>
                  {loading ? "Initializing Ledger..." : "Submit Application"}
                </button>
              </div>
            </>
          )}
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
