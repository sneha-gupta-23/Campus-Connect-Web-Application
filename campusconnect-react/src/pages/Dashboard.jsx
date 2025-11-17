import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Dashboard.css";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaBell,
  FaFileAlt,
  FaCalendarCheck,
  FaClipboardList,
  FaBriefcase,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Live clock update
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tiles = [
    { label: "Internships", icon: <FaBriefcase />, path: "/internship" },
    { label: "Placements", icon: <FaClipboardList />, path: "/placement" },
    { label: "Notices", icon: <FaBell />, path: "/notices" },
    { label: "Notes & Resources", icon: <FaFileAlt />, path: "/notes" },
    { label: "Events", icon: <FaCalendarCheck />, path: "/events" },
    { label: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  const timeString = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateString = currentTime.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2>CampusConnect</h2>
      </div>


        <nav className="sidebar-links">
          {tiles.map((t, i) => (
            <span key={i} onClick={() => navigate(t.path)}>
              {t.icon} {sidebarOpen && <span>{t.label}</span>}
            </span>
          ))}
          <span className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> {sidebarOpen && "Logout"}
          </span>
        </nav>
      </aside>

      {/* Main content */}
      <main className="dashboard-container">
        <h1 className="dashboard-title" data-aos="fade-down">
          <span className="brand">Campus</span>
          <span className="brand-alt">Connect</span>
        </h1>

        {/* ✅ Personalized welcome */}
        <h2 className="dashboard-subtitle" data-aos="fade-up">
          Welcome, {user?.name || "User"}!
          <br />
          <span className="role-tag">{user?.role?.toUpperCase()}</span>
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
        </div>
      </main>

      {/* Right live clock section */}
      <div className="clock-section" data-aos="fade-left">
        <div className="clock-card">
          <h3>{timeString}</h3>
          <p>{dateString}</p>
        </div>
      </div>
    </div>
  );
}
