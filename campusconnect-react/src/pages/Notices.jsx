import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Notices.css";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Load saved notices from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(saved);
  }, []);

  // Save notices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  function addNotice(e) {
    e.preventDefault();
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }
    const newNotice = {
      title: newTitle,
      date: new Date().toLocaleDateString(),
      description: newDescription
    };
    setNotices([newNotice, ...notices]);
    setNewTitle("");
    setNewDescription("");
  }

  return (
    <div className="notices-container">
      <h1>📢 Notices</h1>

      <form onSubmit={addNotice} className="notice-form">
        <input
          type="text"
          placeholder="Notice Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button type="submit">Add Notice</button>
      </form>

      <div className="notices-list">
        {notices.length === 0 ? (
          <p>No notices yet.</p>
        ) : (
          notices.map((notice, index) => (
            <div key={index} className="notice-card">
              <h3>{notice.title}</h3>
              <p><strong>Date:</strong> {notice.date}</p>
              <p>{notice.description}</p>
            </div>
          ))
        )}
      </div>

      <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
    </div>
  );
}
