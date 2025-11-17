import React, { useState, useEffect } from "react";
import "./Internship.css";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import InternshipCard from "../components/InternshipCard";
import InternshipModal from "../components/InternshipModal";
import { Link } from "react-router-dom";

export default function Internship() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const role = user?.role?.toLowerCase();

  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editInternship, setEditInternship] = useState(null);

  useEffect(() => {
    const storedInternships = JSON.parse(localStorage.getItem("internships")) || [];
    setInternships(storedInternships);
  }, []);

  const saveInternships = (updated) => {
    setInternships(updated);
    localStorage.setItem("internships", JSON.stringify(updated));
  };

  const handleAdd = (newInternship) => {
    const updated = [...internships, newInternship];
    saveInternships(updated);
  };

  const handleEdit = (updatedInternship) => {
    const updated = internships.map((i) =>
      i.id === updatedInternship.id ? updatedInternship : i
    );
    saveInternships(updated);
  };

  const handleDelete = (id) => {
    const updated = internships.filter((i) => i.id !== id);
    saveInternships(updated);
  };

  const handleApply = (id) => {
    const updated = internships.map((i) =>
      i.id === id
        ? { ...i, applicants: [...(i.applicants || []), user.name] }
        : i
    );
    saveInternships(updated);
    alert("✅ Applied successfully!");
  };

  const filtered = internships.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="internship-page">
      <Link to="/dashboard" className="back-btn">
        <FaArrowLeft /> Back
      </Link>

      <h2>Internship Opportunities</h2>

      <input
        type="text"
        placeholder="Search internships..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="internship-grid">
        {filtered.length > 0 ? (
          filtered.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              onEdit={() => {
                setEditInternship(internship);
                setShowModal(true);
              }}
              onDelete={() => handleDelete(internship.id)}
              onApply={() => handleApply(internship.id)}
              role={role}
              user={user}
            />
          ))
        ) : (
          <p>No internships found.</p>
        )}
      </div>

      {(role === "admin" || role === "hr") && (
        <button
          className="add-btn"
          onClick={() => {
            setEditInternship(null);
            setShowModal(true);
          }}
        >
          <FaPlus />
        </button>
      )}

      {showModal && (
        <InternshipModal
          closeModal={() => setShowModal(false)}
          onSave={(data) => {
            editInternship ? handleEdit(data) : handleAdd(data);
            setShowModal(false);
          }}
          editData={editInternship}
        />
      )}
    </div>
  );
}
