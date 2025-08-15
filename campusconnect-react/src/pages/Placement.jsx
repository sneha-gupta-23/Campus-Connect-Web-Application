// src/pages/Placement.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Placement() {
  const [placements, setPlacements] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const storedPlacements = JSON.parse(localStorage.getItem("placements")) || [];
    setPlacements(storedPlacements);
  }, []);

  const savePlacements = (newList) => {
    setPlacements(newList);
    localStorage.setItem("placements", JSON.stringify(newList));
  };

  const handleAdd = () => {
    if (!company || !role || !location) return alert("Fill all fields");
    const newPlacement = { company, role, location };
    const updatedList = [...placements, newPlacement];
    savePlacements(updatedList);
    setCompany("");
    setRole("");
    setLocation("");
  };

  const handleUpdate = () => {
    if (editIndex === null) return;
    const updated = [...placements];
    updated[editIndex] = { company, role, location };
    savePlacements(updated);
    setEditIndex(null);
    setCompany("");
    setRole("");
    setLocation("");
  };

  const handleEdit = (index) => {
    const item = placements[index];
    setCompany(item.company);
    setRole(item.role);
    setLocation(item.location);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = placements.filter((_, i) => i !== index);
    savePlacements(updated);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const isAdmin = currentUser?.role === "admin";
  const isHR = currentUser?.role === "hr";
  // eslint-disable-next-line no-unused-vars
  const isStudent = currentUser.role === "student";

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "auto" }}>
      <h2>Placement Opportunities</h2>

      {(isAdmin || isHR) && (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={{ marginRight: "10px", padding: "6px" }}
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginRight: "10px", padding: "6px" }}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ marginRight: "10px", padding: "6px" }}
          />
          {editIndex !== null ? (
            <button onClick={handleUpdate} style={{ padding: "6px 12px", background: "#ffc107" }}>
              Update
            </button>
          ) : (
            <button onClick={handleAdd} style={{ padding: "6px 12px", background: "#007bff", color: "#fff" }}>
              Add
            </button>
          )}
        </div>
      )}

      {placements.length === 0 ? (
        <p>No placement opportunities available.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {placements.map((item, index) => (
            <li key={index} style={{ marginBottom: "12px", borderBottom: "1px solid #ccc", paddingBottom: "8px" }}>
              <strong>{item.company}</strong> — {item.role} ({item.location})
              {(isAdmin || isHR) && (
                <div style={{ marginTop: "5px" }}>
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => handleEdit(index)}
                        style={{ marginRight: "8px", padding: "4px 10px" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        style={{ background: "red", color: "white", padding: "4px 10px" }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button
          onClick={handleBack}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
