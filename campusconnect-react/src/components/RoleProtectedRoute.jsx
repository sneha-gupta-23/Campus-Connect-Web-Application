// src/components/RoleProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({ allowedRoles, children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please log in to continue.");
    return <Navigate to="/login" replace />;
  }

  // if (!allowedRoles.includes(currentUser.role.toLowerCase())) {
  //   alert("Access denied: You are not authorized to view this page.");
  //   return <Navigate to="/dashboard" replace />;
  // }

  return children;
}
