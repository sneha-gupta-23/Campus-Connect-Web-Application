import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1>🎓 CampusConnect</h1>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/internship">Internships</Link>
        <Link to="/placement">Placements</Link>
        <Link to="/events">Events</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/notices">Notices</Link>
        <button
          onClick={() => {
            localStorage.removeItem('loggedInUser');
            window.location.href = '/';
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
