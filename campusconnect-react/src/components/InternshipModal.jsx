// src/components/InternshipModal.jsx
import React, { useState, useEffect } from "react";
import "./InternshipModal.css";

export default function InternshipModal({ isOpen, onClose, onSave, editingInternship }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    category: "",
    mode: "",
    location: "",
    description: "",
    applyLink: ""
  });

  useEffect(() => {
    if (editingInternship) {
      setFormData(editingInternship);
    } else {
      setFormData({
        title: "",
        company: "",
        category: "",
        mode: "",
        location: "",
        description: "",
        applyLink: ""
      });
    }
  }, [editingInternship]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{editingInternship ? "Edit Internship" : "Post New Internship"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <input type="text" name="mode" placeholder="Mode (Remote/On-site)" value={formData.mode} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
          <input type="url" name="applyLink" placeholder="Application Link" value={formData.applyLink} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

          <div className="modal-actions">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
