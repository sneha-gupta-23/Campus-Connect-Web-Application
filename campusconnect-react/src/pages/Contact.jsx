import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h1>📞 Contact Us</h1>
      <p>If you have any questions or need support, please reach out:</p>

      <div className="contact-details">
        <p><strong>Address:</strong> GLA University, Delhi Road</p>
        <p><strong>Email:</strong> support@campusconnect.com</p>
        <p><strong>Phone:</strong> +91-8279606435</p>
      </div>

      <div className="social-buttons">
        <a href="https://www.instagram.com/yourpage" target="_blank" rel="noreferrer" className="btn instagram">Instagram</a>
        <a href="https://www.facebook.com/yourpage" target="_blank" rel="noreferrer" className="btn facebook">Facebook</a>
        <a href="mailto:support@campusconnect.com" className="btn email">Email Us</a>
      </div>

      <Link to="/dashboard" className="back-btn">⬅️ Back to Dashboard</Link>
    </div>
  );
}
