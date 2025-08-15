import React from "react";
import { Link } from "react-router-dom";
import "./Forgot.css";

export default function Forgot() {
  return (
    <div className="split-layout">
      <div className="left-panel">
        <h1>🎓 Campus Connect</h1>
        <div className="tagline-box">
          <h2>Wide College Network</h2>
          <p>Favorite Space To Connect!</p>
        </div>
        <img
          src="https://img.freepik.com/premium-vector/graduation-students_1214-321.jpg"
          alt="Graduates"
          className="illustration"
        />
      </div>

      <div className="right-panel">
        <div className="form-box shadow-card">
          <h2>Reset Password</h2>
          <p>Enter your registered email. We’ll send you reset instructions.</p>

          <form>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />

            <button type="submit">Send Reset Link</button>
          </form>

          <p style={{ marginTop: "20px", textAlign: "center" }}>
            <Link to="/login">← Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
