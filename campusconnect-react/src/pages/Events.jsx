// Events.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Events.css";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "AI Workshop",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYCXXWNIR1h8kMAnKFlKJuK-SbxYgKqBnUeA&s",
      description: "Join our hands-on AI workshop with industry experts!"
    },
    {
      id: 2,
      title: "Tech Talk: Cloud Computing",
      image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Cloud_Computing.jpg",
      description: "Explore the latest trends in cloud technologies."
    },
    {
      id: 3,
      title: "Resume Building Session",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKOrpXRGbDwMAk53NyhITX_Nv0HT9W8S11Og&s",
      description: "Craft the perfect resume with HR professionals."
    },
    {
      id: 4,
      title: "Entrepreneurship Summit",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrCyWCRzlVP5S4U67UOlJRySzXKeDxGpFzSw&s",
      description: "Discover insights from top entrepreneurs and VCs."
    },
  ];

  return (
    <div className="events-page">
      <header className="top-nav">
        <h1>CampusConnect Upcoming Events</h1>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main className="content">
        <div className="left">
          <h2>UPCOMING<br />EVENTS</h2>
          <p>Stay connected and don’t miss out on our exciting upcoming events!</p>
          <p>Workshops, guest lectures, and more to boost your skills.</p>
          {/* <Link to="/service" className="grab-btn">View All Events</Link> */}
        </div>
        <div className="right">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReYgAb21aA3hJkJqHu88eScnYVJpggeK2CUw&s"
            alt="Students attending events"
          />
          <figcaption>Be part of the buzz!</figcaption>
        </div>
      </main>

      {/* Events Section */}
      <section className="events-list">
        <h2>Featured Events</h2>
        <div className="event-cards">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.title} />
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </section>

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