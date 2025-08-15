// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";



export default function Login() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const password = e.target.password.value.trim();
    const selectedRole = e.target.role.value;

    const enteredRoll = e.target.rollno?.value?.trim();
    const enteredEmail = e.target.email?.value?.trim();

    let matchedUser;

    if (selectedRole === "student") {
      matchedUser = users.find(
        (u) =>
          u.role === "student" &&
          u.roll === enteredRoll &&
          u.password === password
      );
    } else {
      matchedUser = users.find(
        (u) =>
          u.role === selectedRole &&
          u.email === enteredEmail &&
          u.password === password
      );
    }

    if (matchedUser) {
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      alert(`Login successful as ${selectedRole}`);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials or role!");
    }
  };

  return (
    <div className="login-layout">
      <div className="login-left">
        <h1>🎓 Campus Connect</h1>
        <h2>Wide College Network</h2>
        <p>Favorite Space To Connect!</p>
        <img
          src="https://img.freepik.com/premium-vector/graduation-students_1214-321.jpg"
          alt="Graduates"
        />
      </div>

      <div className="login-right">
        <div className="form-container">
          <div className="tabs">
            <Link to="/login" className="tab active">Login</Link>
            <Link to="/register" className="tab">Signup</Link>
          </div>

          <form onSubmit={handleLogin}>
            <label>Role</label>
            <select
              name="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
            </select>

            {role === "student" && (
              <>
                <label>University Roll Number</label>
                <input
                  name="rollno"
                  required
                  placeholder="Enter your University Roll No"
                />
              </>
            )}

            {role !== "student" && role && (
              <>
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your Email"
                />
              </>
            )}

            <label>Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="Enter your Password"
            />

            <button type="submit">Login</button>
          </form>

          <p className="signup-cta">
            New to Campus Connect?{" "}
            <Link to="/register">
              <strong>Signup</strong>
            </Link>
          </p>

          <Link to="/" className="back-home-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
