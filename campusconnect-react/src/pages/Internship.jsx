import React, { useEffect, useState } from "react";
import InternshipCard from "../components/InternshipCard";
import InternshipModal from "../components/InternshipModal";
import "./Internship.css";

export default function Internship() {
  const [internships, setInternships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editInternship, setEditInternship] = useState(null);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchInternships();
  }, [fetchInternships]);

  const fetchInternships = async () => {
    try {
      const res = await fetch("/api/internships");
      const data = await res.json();
      setInternships(data);

      if (currentUser?.role === "student") {
        const appRes = await fetch(`/api/applications/${currentUser._id}`);
        const appData = await appRes.json();
        const appliedIds = appData.map((app) => app.internshipId);
        setAppliedInternships(appliedIds);
      }
    } catch (err) {
      console.error("Error fetching internships:", err);
    }
  };

  const handleApply = async (internshipId) => {
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser._id,
          internshipId,
        }),
      });
      if (res.ok) {
        setAppliedInternships((prev) => [...prev, internshipId]);
      }
    } catch (err) {
      console.error("Error applying:", err);
    }
  };

  const handleSave = async (formData) => {
    const isEdit = !!editInternship;
    const url = isEdit
      ? `/api/internships/${editInternship._id}`
      : "/api/internships";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowModal(false);
        setEditInternship(null);
        fetchInternships();
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/internships/${id}`, { method: "DELETE" });
      if (res.ok) fetchInternships();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filtered = internships.filter((i) => {
    const matchesSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? i.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="internship-container">
      <div className="internship-header">
        <h2>Internship Opportunities</h2>

        {(currentUser?.role === "admin" || currentUser?.role === "hr") && (
          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Post Internship
          </button>
        )}
      </div>

      <div className="internship-filters">
        <input
          type="text"
          placeholder="Search title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Web Dev">Web Dev</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Data">Data</option>
        </select>
      </div>

      <div className="internship-list">
        {filtered.length === 0 ? (
          <p>No internships found.</p>
        ) : (
          filtered.map((internship) => (
            <InternshipCard
              key={internship._id}
              internship={internship}
              currentUser={currentUser}
              onApply={handleApply}
              isApplied={appliedInternships.includes(internship._id)}
              onEdit={() => {
                setEditInternship(internship);
                setShowModal(true);
              }}
              onDelete={() => handleDelete(internship._id)}
            />
          ))
        )}
      </div>

      {showModal && (
        <InternshipModal
          onClose={() => {
            setShowModal(false);
            setEditInternship(null);
          }}
          onSave={handleSave}
          internship={editInternship}
        />
      )}
    </div>
  );
}
