import React, { useState, useEffect } from "react";
import "./Notices.css";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

export default function Notices() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const role = loggedInUser?.role?.toLowerCase();

  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedNotices = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(savedNotices);
  }, []);

  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (!newNotice.title.trim() || !newNotice.description.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    const updatedNotices =
      editingIndex !== null
        ? notices.map((n, i) => (i === editingIndex ? newNotice : n))
        : [...notices, newNotice];

    setNotices(updatedNotices);
    setNewNotice({ title: "", description: "", date: "" });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setNewNotice(notices[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      const updated = notices.filter((_, i) => i !== index);
      setNotices(updated);
    }
  };

  return (
    <div className="notice-container">
      <h1>📢 Notices</h1>

      {/* Admin Only Form */}
      {role === "admin" && (
        <form className="notice-form" onSubmit={handleAddOrUpdate}>
          <h2>{editingIndex !== null ? "Edit Notice" : "Add New Notice"}</h2>
          <input
            type="text"
            placeholder="Enter Notice Title"
            value={newNotice.title}
            onChange={(e) =>
              setNewNotice({ ...newNotice, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Enter Notice Description"
            value={newNotice.description}
            onChange={(e) =>
              setNewNotice({ ...newNotice, description: e.target.value })
            }
            required
          ></textarea>
          <input
            type="date"
            value={newNotice.date}
            onChange={(e) =>
              setNewNotice({ ...newNotice, date: e.target.value })
            }
          />
          <button type="submit">
            {editingIndex !== null ? "Save Changes" : <><FaPlus /> Add Notice</>}
          </button>
        </form>
      )}

      {/* Notice List */}
      <div className="notice-list">
        {notices.length === 0 ? (
          <p className="no-notice">No notices available</p>
        ) : (
          notices.map((n, index) => (
            <div key={index} className="notice-card">
              <h3>{n.title}</h3>
              <p>{n.description}</p>
              <small>📅 {n.date || "No date provided"}</small>

              {role === "admin" && (
                <div className="notice-actions">
                  <button onClick={() => handleEdit(index)}>
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
