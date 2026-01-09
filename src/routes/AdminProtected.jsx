import { Navigate } from "react-router-dom";

export default function AdminProtected({ children }) {
  const isAdmin = localStorage.getItem("admin_auth") === "true";

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
