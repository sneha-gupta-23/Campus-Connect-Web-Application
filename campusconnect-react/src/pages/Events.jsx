import React from "react";
import { Link } from "react-router-dom";
import "./Events.css";

export default function Events() {
  return (
    <div className="events-page">
      <header className="top-nav">
        <h1>CampusConnect Upcoming Events</h1>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main className="content">
        <div className="left">
          <h2>UPCOMING<br />EVENTS</h2>
          <p>Stay connected and don’t miss out on our exciting upcoming events!</p>
          <p>Workshops, guest lectures, and more to boost your skills.</p>
          <Link to="/service" className="grab-btn">View All Events</Link>
        </div>
        <div className="right">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReYgAb21aA3hJkJqHu88eScnYVJpggeK2CUw&s"
            alt="Students attending events"
          />
          <figcaption>Be part of the buzz!</figcaption>
        </div>
      </main>

      <footer>
        <h3>Contact Details</h3>
        <div className="footer-links">
          <button>Instagram</button>
          <button>Facebook</button>
          <button>Email</button>
          <Link to="/dashboard"><button>Main Page</button></Link>
        </div>
        <address>
          Delhi Road, GLA University<br />
          xyz@gmail.com
        </address>
      </footer>
    </div>
  );
}
