import React, { useState, useEffect } from "react";
import "./Notes.css";
import { useAuth } from "../context/AuthContext";
import {
  FaFilePdf,
  FaFileWord,
  FaTrash,
  FaUpload,
  FaSearch,
  FaArrowLeft,
  FaLink,
  FaPlusCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Notes = () => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceLink, setResourceLink] = useState("");

  // Dummy Notes and Resources
  useEffect(() => {
    setNotes([
      {
        _id: "1",
        title: "Operating System Unit 1",
        uploader: "Riya Sharma",
        createdAt: new Date(),
        fileUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        _id: "2",
        title: "DBMS Notes",
        uploader: "Admin - GLA University",
        createdAt: new Date(),
        fileUrl: "https://www.orimi.com/pdf-test.pdf",
      },
      {
        _id: "3",
        title: "Software Engineering Summary",
        uploader: "Aarav Mehta",
        createdAt: new Date(),
        fileUrl: "https://file-examples.com/storage/fe3f45b1db7/sample.pdf",
      },
    ]);

    setResources([
      {
        _id: "r1",
        title: "Data Structures Full Notes (Google Drive)",
        link: "https://drive.google.com",
        uploader: "Admin",
      },
      {
        _id: "r2",
        title: "Placement Preparation Materials",
        link: "https://prepinsta.com",
        uploader: "HR - CampusConnect",
      },
      {
        _id: "r3",
        title: "JavaScript Crash Course (YouTube)",
        link: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        uploader: "Admin",
      },
    ]);
  }, []);

  // Upload Notes
  const handleUpload = (e) => {
    e.preventDefault();
    if (!title || !file) {
      alert("Please enter a title and choose a file");
      return;
    }

    const newNote = {
      _id: Date.now(),
      title,
      uploader: currentUser?.name || "Unknown",
      createdAt: new Date(),
      fileUrl: URL.createObjectURL(file),
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setFile(null);
  };

  // Add Resource (Admin/HR only)
  const handleAddResource = (e) => {
    e.preventDefault();
    if (!resourceTitle || !resourceLink) {
      alert("Please enter both title and link");
      return;
    }

    const newResource = {
      _id: Date.now(),
      title: resourceTitle,
      link: resourceLink,
      uploader: currentUser?.name || "Admin",
    };

    setResources([newResource, ...resources]);
    setResourceTitle("");
    setResourceLink("");
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Delete this note?")) {
      setNotes(notes.filter((n) => n._id !== id));
    }
  };

  const handleDeleteResource = (id) => {
    if (window.confirm("Delete this resource?")) {
      setResources(resources.filter((r) => r._id !== id));
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.uploader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-container">
      <div className="notes-header">
        <Link to="/dashboard" className="back-btn">
          <FaArrowLeft /> Back to Dashboard
        </Link>
        <h1>📚 Notes & Resources</h1>
      </div>

      {/* Notes Upload Section */}
      {(currentUser?.role === "Admin" ||
        currentUser?.role === "HR" ||
        currentUser?.role === "Student") && (
        <form onSubmit={handleUpload} className="upload-form">
          <input
            type="text"
            placeholder="Enter Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" className="upload-btn">
            <FaUpload /> Upload Note
          </button>
        </form>
      )}

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search notes by title or uploader..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Notes Grid */}
      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note._id} className="note-card">
              <div className="note-info">
                <h3>{note.title}</h3>
                <p>
                  Uploaded by: <b>{note.uploader}</b>
                </p>
                <p>Date: {new Date(note.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="note-actions">
                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  {note.fileUrl.endsWith(".pdf") ? (
                    <FaFilePdf />
                  ) : (
                    <FaFileWord />
                  )}{" "}
                  View / Download
                </a>
                {currentUser?.role === "Admin" && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteNote(note._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-notes">No notes found.</p>
        )}
      </div>

      {/* Divider */}
      <hr style={{ margin: "40px 0", opacity: "0.5" }} />

      {/* 📁 Resources Section */}
      <h2 className="section-title">🌐 Useful Resources</h2>

      {(currentUser?.role === "Admin" || currentUser?.role === "HR") && (
        <form onSubmit={handleAddResource} className="upload-form">
          <input
            type="text"
            placeholder="Enter Resource Title"
            value={resourceTitle}
            onChange={(e) => setResourceTitle(e.target.value)}
          />
          <input
            type="url"
            placeholder="Enter Resource Link (https://...)"
            value={resourceLink}
            onChange={(e) => setResourceLink(e.target.value)}
          />
          <button type="submit" className="upload-btn">
            <FaPlusCircle /> Add Resource
          </button>
        </form>
      )}

      {/* Resource Grid */}
      <div className="notes-grid">
        {resources.length > 0 ? (
          resources.map((r) => (
            <div key={r._id} className="note-card">
              <div className="note-info">
                <h3>{r.title}</h3>
                <p>
                  Shared by: <b>{r.uploader}</b>
                </p>
              </div>
              <div className="note-actions">
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  <FaLink /> Open Link
                </a>
                {currentUser?.role === "Admin" && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteResource(r._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-notes">No resources available.</p>
        )}
      </div>
    </div>
  );
};

export default Notes;
