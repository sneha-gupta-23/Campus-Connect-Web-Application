// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser) {
    alert("Please log in to continue.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
