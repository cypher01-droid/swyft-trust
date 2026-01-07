import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

import { uploadToImgBB } from "../../utils/imgbb"; // make sure this exists

export default function Signup() {
      const navigate = useNavigate(); // ✅ Add this
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

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!form.idFile || !form.addressFile) {
    alert("Please upload required verification documents.");
    return;
  }

  try {
    // 1️⃣ Upload KYC images to ImgBB
    const idURL = await uploadToImgBB(form.idFile);
    const addressURL = await uploadToImgBB(form.addressFile);

    // 2️⃣ Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
    const uid = userCredential.user.uid;

    // 3️⃣ Save user data in Firestore
    await setDoc(doc(db, "users", uid), {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      kyc: {
        idDocument: idURL,
        addressProof: addressURL,
      },
      createdAt: serverTimestamp(),
    });

    alert("Registration successful! Welcome to Swyft Trust.");
    navigate("/dashboard");
    setStep(1);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      idFile: null,
      addressFile: null,
    });

  } catch (err) {
    console.error("Firebase signup error:", err);
    alert("Error during registration: " + err.message);
  }
};

  return (
    <div className="signup-page">
      <div className="signup-card">

        {/* RETURN HOME */}
        <Link to="/" className="back-home">← Back to Home</Link>

        {/* PROGRESS */}
        <div className="progress">
          {[1,2,3,4,5].map(n => (
            <div key={n} className={`dot ${step >= n ? "active" : ""}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit}>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2>Create Account</h2>
              <input name="fullName" placeholder="Full Name" required onChange={handleChange} />
              <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
              <button type="button" onClick={next}>Continue</button>
            </>
          )}

          {/* STEP 2 */}
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

          {/* STEP 3 */}
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

          {/* STEP 4 – KYC */}
          {step === 4 && (
            <>
              <h2>Identity Verification</h2>
              <p className="small">Required to comply with banking regulations.</p>

              <label className="file-label">
                Government ID
                <input type="file" name="idFile" accept="image/*,.pdf" required onChange={handleChange} />
              </label>

              <label className="file-label">
                Proof of Address
                <input type="file" name="addressFile" accept="image/*,.pdf" required onChange={handleChange} />
              </label>

              <div className="nav-buttons">
                <button type="button" className="ghost" onClick={prev}>Back</button>
                <button type="button" onClick={next}>Continue</button>
              </div>
            </>
          )}

          {/* STEP 5 – REVIEW & SUBMIT */}
          {step === 5 && (
            <>
              <h2>Review & Submit</h2>
              <div className="review">
                <p><strong>Name:</strong> {form.fullName}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Phone:</strong> {form.phone}</p>
                <p><strong>ID:</strong> Uploaded</p>
                <p><strong>Address:</strong> Uploaded</p>
              </div>

              <div className="nav-buttons">
                <button type="button" className="ghost" onClick={prev}>Back</button>
                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
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
