import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) return <div className="spinner">Loading dashboard...</div>;

  return (
    <div className="dashboard-page">
      <header>
        <h1>Welcome, {userData.fullName}</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <section className="dashboard-section balances">
        <h2>Account Balances</h2>
        <p><strong>USD:</strong> $5,000</p>
        <p><strong>EUR:</strong> €3,200</p>
        <p><strong>GBP:</strong> £2,100</p>
      </section>

      <section className="dashboard-section loans">
        <h2>Active Loans</h2>
        <p><strong>Car Loan:</strong> $12,000 — Remaining: $8,500</p>
        <p><strong>Personal Loan:</strong> $5,000 — Remaining: $2,200</p>
      </section>

      <section className="dashboard-section refunds">
        <h2>Recent Refunds</h2>
        <p>$500 refunded on 01/01/2026</p>
        <p>$250 refunded on 28/12/2025</p>
      </section>

      <section className="dashboard-section kyc">
        <h2>KYC Documents</h2>
        <p>ID Document:</p>
        <img src={userData.kyc.idDocument} alt="ID Document" width={200} />
        <p>Proof of Address:</p>
        <img src={userData.kyc.addressProof} alt="Address Proof" width={200} />
      </section>
    </div>
  );
}
