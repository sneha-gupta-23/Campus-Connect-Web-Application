import React, { useState } from "react";
import "./InternshipModal.css";

export default function InternshipModal({ closeModal, onSave, editData }) {
  const [form, setForm] = useState(
    editData || {
      id: Date.now(),
      title: "",
      company: "",
      location: "",
      stipend: "",
      icon: "",
      applicants: [],
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{editData ? "Edit Internship" : "Add Internship"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Stipend"
            value={form.stipend}
            onChange={(e) => setForm({ ...form, stipend: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Icon URL (optional)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
          />
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
