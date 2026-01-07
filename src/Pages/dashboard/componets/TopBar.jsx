import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import "./topbar.css";

export default function Topbar() {
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <header className="topbar">
      <span>Dashboard</span>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
