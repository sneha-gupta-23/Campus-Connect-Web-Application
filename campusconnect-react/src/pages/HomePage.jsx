import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo">CampusConnect</Link>
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1>Welcome to CampusConnect</h1>
            <p>
              Your all-in-one campus companion — manage internships, placements,
              notes, and notices in one smooth experience.
            </p>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
          <div className="hero-img">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Campus illustration"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Explore Our Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135712.png" alt="Internships" />
              <h3>Internships</h3>
              <p>Search, apply, and manage internships seamlessly.</p>
            </div>
            <div className="feature-card">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135710.png" alt="Placements" />
              <h3>Placements</h3>
              <p>Get notified about the latest placement opportunities.</p>
            </div>
            <div className="feature-card">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135708.png" alt="Notes" />
              <h3>Notes & Notices</h3>
              <p>Access notes and stay updated with campus announcements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} CampusConnect — All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
