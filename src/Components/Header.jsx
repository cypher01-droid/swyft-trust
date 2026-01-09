import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ShieldCheck } from "lucide-react";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#hero", type: "anchor" },
    { name: "Features", href: "#features", type: "anchor" },
    { name: "FAQ", href: "#faq", type: "anchor" },
    { name: "Check Status", href: "/check-status", type: "link" },
  ];

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo" onClick={() => window.scrollTo(0, 0)}>
          <div className="logo-icon">
            <ShieldCheck size={20} color="white" />
          </div>
          <span className="logo-text">Swyft<span>Trust</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          {navItems.map((item) => (
            item.type === "anchor" ? (
              <a key={item.name} href={item.href} className="nav-link">{item.name}</a>
            ) : (
              <Link key={item.name} to={item.href} className="nav-link">{item.name}</Link>
            )
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="header-auth">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="signup-btn">Get Started</Link>
          
          {/* Hamburger */}
          <button className="hamburger" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav with Framer Motion */}
      <AnimatePresence>
        {open && (
          <motion.nav 
            className="nav-mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setOpen(false)} className="mobile-link">
                {item.name}
              </Link>
            ))}
            <hr className="nav-divider" />
            <Link to="/login" className="mobile-link auth-alt" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" className="mobile-signup" onClick={() => setOpen(false)}>Sign Up</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
