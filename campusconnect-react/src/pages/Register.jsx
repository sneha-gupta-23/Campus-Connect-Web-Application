// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_SECRET_KEY, HR_SECRET_KEY } from "../constants";
import "./Register.css";


export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name?.value?.trim();
    const roll = e.target.roll?.value?.trim();
    const email = e.target.email?.value?.trim();
    const password = e.target.pass?.value;
    const cpass = e.target.cpass?.value;
    const enteredKey = e.target.secret?.value?.trim();
    const selectedRole = e.target.role.value;

    if (password !== cpass) {
      alert("Passwords do not match!");
      return;
    }

    if (
      (selectedRole === "admin" && enteredKey !== ADMIN_SECRET_KEY) ||
      (selectedRole === "hr" && enteredKey !== HR_SECRET_KEY)
    ) {
      alert("Invalid Secret Key for selected role!");
      return;
    }

    const newUser = {
      name,
      roll,
      email,
      password,
      role: selectedRole,
      ...(selectedRole === "student" && { roll }),
    };

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const alreadyExists = users.find(
      (u) => u.email === email || (selectedRole === "student" && u.roll === roll)
    );
    if (alreadyExists) {
      alert("User already exists!");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Registration successful!");
    navigate("/dashboard");
  };

  return (
    <div className="split-layout">
      <div className="left-panel">
        <h1>🎓 Campus Connect</h1>
        <h2>Wide College Network</h2>
        <p>Favorite Space To Connect</p>
        <img
          src="https://img.freepik.com/premium-vector/graduation-students_1214-321.jpg"
          alt="Graduates"
          className="illustration"
        />
      </div>

      <div className="right-panel">
        <div className="form-box shadow-card">
          <div className="tabs">
            <Link to="/login" className="tab">Login</Link>
            <Link to="/register" className="tab active">Signup</Link>
          </div>

          <form onSubmit={handleRegister}>
            <label>Role</label>
            <select name="role" required value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
            </select>

            <label>Full Name</label>
            <input name="name" placeholder="Enter your name" required />

            {role === "student" && (
              <>
                <label>University Roll Number</label>
                <input name="roll" placeholder="Enter your university roll number" required />
              </>
            )}

            <label>Email</label>
            <input name="email" type="email" placeholder="Enter your email" required />

            {role !== "student" && (
              <>
                <label>Secret Key</label>
                <input name="secret" type="password" placeholder="Enter secret key" required />
              </>
            )}

            <label>Create Password</label>
            <input name="pass" type="password" placeholder="Create your password" required />
            <label>Confirm Password</label>
            <input name="cpass" type="password" placeholder="Confirm password" required />

            <button type="submit">Register</button>
          </form>

          <p className="signup-cta">
            Already have an account? <Link to="/login"><strong>Login</strong></Link>
          </p>

          <Link to="/" className="back-home-link">← Back to Home</Link>

        </div>
      </div>
    </div>
  );
}
