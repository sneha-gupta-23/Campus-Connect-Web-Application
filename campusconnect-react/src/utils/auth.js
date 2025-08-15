// src/utils/auth.js
export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const hasAccess = (roles) => {
  const user = getCurrentUser();
  return user && roles.includes(user.role);
};
