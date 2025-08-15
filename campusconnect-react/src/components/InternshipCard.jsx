// src/components/InternshipCard.jsx
import React from "react";
import "./InternshipCard.css";

export default function InternshipCard({ internship, currentUser, onApply, isApplied, onEdit, onDelete }) {
  return (
    <div className="internship-card">
      <div className="card-header">
        <h3>{internship.title}</h3>
        <span className="badge">{internship.category}</span>
      </div>
      <p className="company">{internship.company}</p>
      <p className="mode-location">
        <span>{internship.mode}</span> | <span>{internship.location}</span>
      </p>
      <p className="description">{internship.description}</p>

      <div className="card-actions">
        {currentUser.role === "student" && (
          <>
            <button
              onClick={() => onApply(internship._id)}
              className={`apply-btn ${isApplied ? "applied" : ""}`}
              disabled={isApplied}
            >
              {isApplied ? "Applied" : "Apply"}
            </button>
            {internship.applyLink && (
              <a
                href={internship.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                Visit Link
              </a>
            )}
          </>
        )}

        {(currentUser.role === "admin" || currentUser.role === "hr") && (
          <div className="admin-controls">
            <button onClick={() => onEdit(internship)} className="edit-btn">Edit</button>
            <button onClick={() => onDelete(internship._id)} className="delete-btn">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
