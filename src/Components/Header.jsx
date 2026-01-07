import { useState } from "react";
import "./Header.css";
import { href } from "react-router";


export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Features", href: "#features" },
    { name: "Partners", href: "#partners" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
    {name: "Login", href:"/login"},
    { name: "Sign Up", href: "/register" },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">ST</div>
          <span className="logo-text">Swyft Trust</span>
        </div>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="nav-link">
              {item.name}
            </a>
          ))}
        </nav>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span className={open ? "bar rotate1" : "bar"}></span>
          <span className={open ? "bar hide" : "bar"}></span>
          <span className={open ? "bar rotate2" : "bar"}></span>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="nav-mobile">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
