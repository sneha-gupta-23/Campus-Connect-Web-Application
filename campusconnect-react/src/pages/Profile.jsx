import React, { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
      setUpdatedUser(currentUser);
    }
  }, []);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, ...updatedUser } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1>👤 My Profile</h1>
      <div className="profile-card">
        <div className="profile-photo">
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            className="circle-pic"
          />
        </div>

        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Role:</strong> {user.role}</p>

          {/* Editable Fields */}
          {user.role === "student" && (
            <>
              <label>University Roll Number:</label>
              <input
                name="roll"
                value={updatedUser.roll || ""}
                disabled={!isEditing}
                onChange={handleChange}
              />
              <label>Current Year:</label>
              <input
                name="year"
                value={updatedUser.year || ""}
                disabled={!isEditing}
                onChange={handleChange}
              />
              <label>Semester:</label>
              <input
                name="semester"
                value={updatedUser.semester || ""}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </>
          )}

          {/* Common Fields */}
          <label>Email:</label>
          <input
            name="email"
            value={updatedUser.email || ""}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <label>Contact Number:</label>
          <input
            name="contact"
            value={updatedUser.contact || ""}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <div className="profile-actions">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
            ) : (
              <button onClick={handleSave}>💾 Save</button>
            )}
            <button onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}
