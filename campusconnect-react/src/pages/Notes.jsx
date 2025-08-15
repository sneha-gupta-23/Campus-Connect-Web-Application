import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Notes.css";
import { useAuth } from "../context/AuthContext";
import axios from "axios";



export default function Notes() {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/study-resources")
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(err => console.error("Error fetching study resources", err));
  }, []);

  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };


  useEffect(() => {
    fetchNotes();
  }, []);



  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file || !title) return alert("Please enter title and choose a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("uploadedBy", currentUser?.name);
    formData.append("role", currentUser?.role);

    try {
      await axios.post("http://localhost:5000/api/notes/upload", formData);
      setFile(null);
      setTitle("");
      fetchNotes();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (currentUser?.role !== "admin") return;

    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-page">
      <h1 className="notes-heading">Notes Section</h1>

      <form onSubmit={handleFileUpload} className="upload-form">
        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>

      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="notes-list">
        {filteredNotes.map((note) => (
          <div className="note-card" key={note._id}>
            <h3>{note.title}</h3>
            <p>
              Uploaded by: <strong>{note.uploadedBy}</strong>
            </p>
            <p>Date: {new Date(note.createdAt).toLocaleDateString()}</p>
            <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">
              View File
            </a>
            {currentUser?.role === "admin" && (
              <button onClick={() => handleDelete(note._id)} className="delete-btn">
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      <hr />

        {/* Study Resources Section */}
      <div className="study-resources">
        <h2>📚 Study Resources</h2>
        <div className="resource-list">
          {resources.length > 0 ? (
            resources.map((resource, idx) => (
              <div key={idx} className="resource-card">
                <h4>{resource.title}</h4>
                <p>{resource.description}</p>
                <a href={resource.link} target="_blank" rel="noreferrer">Open Resource</a>
                <p><b>Subject:</b> {resource.subject}</p>
                <p><i>Uploaded by: {resource.uploadedBy}</i></p>
              </div>
            ))
          ) : (
            <p>No study resources found.</p>
          )}
        </div>
      </div>

      <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
    </div>
  );
}
