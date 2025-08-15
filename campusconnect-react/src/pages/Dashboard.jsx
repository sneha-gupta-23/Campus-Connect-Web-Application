import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const tiles = [
    { label: "Internship", icon: "💼", path: "/internship" },
    { label: "Placement", icon: "🎯", path: "/placement" },
    { label: "Notices", icon: "📢", path: "/notices" },
    { label: "Notes & Resources", icon: "📄", path: "/notes" },
    { label: "Events", icon: "🎉", path: "/events" },
    { label: "Profile", icon: "👤", path: "/profile" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title" data-aos="fade-down">
        <span className="brand">Campus</span><span className="brand-alt">Connect</span>
      </h1>
      <h2 className="dashboard-subtitle" data-aos="fade-up">
        Welcome, {user?.name || "Student"}!
      </h2>

      <div className="tiles-grid" data-aos="zoom-in-up">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className="tile-card"
            onClick={() => navigate(tile.path)}
          >
            <div className="tile-icon">{tile.icon}</div>
            <div className="tile-label">{tile.label}</div>
          </div>
        ))}
        <div className="tile-card coming-soon">
          <div className="tile-icon">⚙️</div>
          <div className="tile-label">More</div>
        </div>
      </div>

      <div className="bottom-nav" data-aos="fade-up">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/notices">Notices</Link>
        <Link to="/profile">Profile</Link>
      </div>

    </div>
  );
}
