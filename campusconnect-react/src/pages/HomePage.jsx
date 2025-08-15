import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HomePage.css";
import { FaArrowUp } from "react-icons/fa";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const auth = useAuth();
  const currentUser = auth?.currentUser;

  const navigate = useNavigate(); 


  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 80,
      easing: 'ease-in-out',
      once: true
    });
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const btn = document.getElementById("scrollToTopBtn");
      if (btn) btn.style.display = scrollTop > 300 ? "block" : "none";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={`homepage ${darkMode ? "dark" : ""}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">CampusConnect</div>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#features">Features</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="/notes">Notes</a>
          <a href="/internship">Internships</a>
          <a href="/placement">Placements</a>
        </div>
        <button className="darkmode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙" : "☀️"}
        </button>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero" data-aos="fade-up">
        <h1>Welcome to CampusConnect</h1>
        <p>Your all-in-one campus companion</p>
        <div className="btn-group">
          <a href="/register" className="btn">Get Started</a>

          {/* Show only if admin or HR */}
          {(currentUser?.role === "admin" || currentUser?.role === "hr") && (
            <button className="btn outline" onClick={() => navigate("/post-internship")}>
              + Post Internship
            </button>
          )}
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="features" data-aos="fade-up">
        <h2>Our Features</h2>
        <div className="grid">
          <div className="card">📚 Notes Sharing</div>
          <div className="card">🎯 Internship Listings</div>
          <div className="card">🗓️ Event Updates</div>
          <div className="card">📢 Notices</div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services" data-aos="fade-up">
        <h2>Our Services</h2>
        <div className="grid">
          <div className="card">🔍 Placement Prep</div>
          <div className="card">📝 Resume Builder</div>
          <div className="card">🧠 Doubt Solving</div>
          <div className="card">💼 HR Connect</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials" data-aos="fade-up">
        <h2>What Students Say</h2>
        <div className="grid">
          <div className="card">"Best app to manage my semester!"</div>
          <div className="card">"Easy access to all campus updates."</div>
          <div className="card">"Loved the internships section!"</div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about" data-aos="fade-up">
        <h2>About CampusConnect</h2>
        <p>
          CampusConnect is designed to simplify student life. Whether it’s sharing notes,
          exploring career options, or staying updated with events — we’ve got you covered!
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact" data-aos="fade-up">
        <h2>Contact Us</h2>
        <p>Email: support@campusconnect.com</p>
        <p>Phone: +91-9876543210</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
      </footer>

      {/* Scroll To Top Button */}
      <button id="scrollToTopBtn" className="scroll-top" onClick={scrollToTop}>
        <FaArrowUp />
      </button>
    </div>
  );
}
