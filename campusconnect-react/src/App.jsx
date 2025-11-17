import React from "react";
import { Routes, Route } from "react-router-dom";

// Guards
import PrivateRoute from "./components/PrivateRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Notes from "./pages/Notes";
import Notices from "./pages/Notices";
import Contact from "./pages/Contact";
import Internship from "./pages/Internship";
import Placement from "./pages/Placement";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/events"
        element={
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <Notes />
          </PrivateRoute>
        }
      />
      <Route
        path="/notices"
        element={
          <PrivateRoute>
            <Notices />
          </PrivateRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        }
      />

      {/* ✅ Internship and Placement Routes */}
      <Route
        path="/internship"
        element={
          <RoleProtectedRoute allowedRoles={["admin", "hr", "student"]}>
            <Internship />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/placement"
        element={
          <RoleProtectedRoute allowedRoles={["admin", "hr", "student"]}>
            <Placement />
          </RoleProtectedRoute>
        }
      />
    </Routes>
  );
}
