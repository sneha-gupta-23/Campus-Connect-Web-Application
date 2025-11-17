import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Placement.css";

export default function Placement() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const role = storedUser?.role || "student";
  const name = storedUser?.name || "User";

  const [placements, setPlacements] = useState(() => {
    const saved = localStorage.getItem("placements");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            company: "Google",
            role: "Software Engineer",
            location: "Bangalore, India",
            package: "₹18 LPA",
            applyLink: "https://careers.google.com/",
            applicants: 12,
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
          },
          {
            id: 2,
            company: "TCS",
            role: "System Engineer",
            location: "Pune, India",
            package: "₹7 LPA",
            applyLink: "https://www.tcs.com/careers",
            applicants: 28,
            logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Tata_Consultancy_Services_Logo.svg",
          },
        ];
  });

  const [newPlacement, setNewPlacement] = useState({
    company: "",
    role: "",
    location: "",
    package: "",
    applyLink: "",
    logo: "",
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("placements", JSON.stringify(placements));
  }, [placements]);

  const handleAddPlacement = () => {
    if (
      !newPlacement.company ||
      !newPlacement.role ||
      !newPlacement.location ||
      !newPlacement.package ||
      !newPlacement.applyLink
    ) {
      alert("Please fill all fields!");
      return;
    }

    const updatedPlacements = [
      ...placements,
      { id: Date.now(), ...newPlacement, applicants: 0 },
    ];
    setPlacements(updatedPlacements);
    setNewPlacement({
      company: "",
      role: "",
      location: "",
      package: "",
      applyLink: "",
      logo: "",
    });
  };

  const handleDelete = (id) => {
    const updated = placements.filter((p) => p.id !== id);
    setPlacements(updated);
  };

  const handleApply = (id) => {
    const updated = placements.map((p) =>
      p.id === id ? { ...p, applicants: p.applicants + 1 } : p
    );
    setPlacements(updated);
    alert("✅ Application recorded! You can continue on the company site.");
  };

  // Filter placements by search text
  const filteredPlacements = placements.filter(
    (p) =>
      p.company.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="placement-container">
      {/* Header Section */}
      <div className="placement-header">
        <h2 className="placement-title">Placement Opportunities</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      <p className="placement-subtitle">
        Explore full-time roles and apply directly to top companies.
      </p>

      {/* Search Filter */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by company, role, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Admin/HR Add Section */}
      {(role === "admin" || role === "hr") && (
        <div className="add-placement-form">
          <h3>{role === "admin" ? "Post New Placement" : "Add Placement"}</h3>
          <div className="form-fields">
            <input
              type="text"
              placeholder="Company Name"
              value={newPlacement.company}
              onChange={(e) =>
                setNewPlacement({ ...newPlacement, company: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Role"
              value={newPlacement.role}
              onChange={(e) =>
                setNewPlacement({ ...newPlacement, role: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={newPlacement.location}
              onChange={(e) =>
                setNewPlacement({ ...newPlacement, location: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Package (e.g. ₹10 LPA)"
              value={newPlacement.package}
              onChange={(e) =>
                setNewPlacement({ ...newPlacement, package: e.target.value })
              }
            />
            <input
              type="url"
              placeholder="Apply Link"
              value={newPlacement.applyLink}
              onChange={(e) =>
                setNewPlacement({ ...newPlacement, applyLink: e.target.value })
              }
            />
            <input
              type="url"
              placeholder="Logo URL (optional)"
              value={newPlacement.logo}
              onChange={(e) =>
                setNewPlacement({ ...newPlacement, logo: e.target.value })
              }
            />
            <button onClick={handleAddPlacement}>Add Placement</button>
          </div>
        </div>
      )}

      {/* Placement Cards */}
      <div className="placement-cards">
        {filteredPlacements.length > 0 ? (
          filteredPlacements.map((placement) => (
            <div className="placement-card" key={placement.id}>
              {placement.logo && (
                <img
                  src={placement.logo}
                  alt={placement.company}
                  className="company-logo"
                />
              )}
              <h3>{placement.role}</h3>
              <p className="company-name">{placement.company}</p>
              <p>{placement.location}</p>
              <p className="package">{placement.package}</p>
              <p className="applicants">{placement.applicants} Applied</p>

              <div className="card-buttons">
                <a
                  href={placement.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-btn"
                  onClick={() => handleApply(placement.id)}
                >
                  Apply Now →
                </a>

                {role === "admin" && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(placement.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No placements found for your search.</p>
        )}
      </div>
    </div>
  );
}
