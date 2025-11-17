import React from "react";
import "./InternshipCard.css";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

export default function InternshipCard({ internship, onEdit, onDelete, onApply, role, user }) {
  // ✅ handle null user safely
  const userName = user?.name || "Guest";
  const hasApplied = Array.isArray(internship.applicants)
  ? internship.applicants.includes(userName)
  : false;


  return (
    <div className="internship-card">
      <div className="internship-icon">
        <img
          src={internship.icon || "https://cdn-icons-png.flaticon.com/512/1055/1055646.png"}
          alt="intern"
          width="50"
        />
      </div>
      <h3>{internship.title}</h3>
      <p>{internship.company}</p>
      <p>{internship.location}</p>
      <p>₹{internship.stipend} / Month</p>
      <p className="hiring">Actively Hiring</p>

      {role === "student" && (
        <button
          className={`apply-btn ${hasApplied ? "applied" : ""}`}
          onClick={hasApplied ? null : onApply}
          disabled={hasApplied}
        >
          {hasApplied ? (
            <>
              <FaCheckCircle /> Applied
            </>
          ) : (
            "Apply"
          )}
        </button>
      )}

      {(role === "admin" || role === "hr") && (
        <div className="action-btns">
          <button className="edit-btn" onClick={onEdit}>
            <FaEdit />
          </button>
          {role === "admin" && (
            <button className="delete-btn" onClick={onDelete}>
              <FaTrash />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
