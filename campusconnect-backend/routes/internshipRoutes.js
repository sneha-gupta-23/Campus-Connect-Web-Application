// routes/internshipRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllInternships,
  createInternship,
  updateInternship,
  deleteInternship,
  applyForInternship,
  getUserApplications,
} = require("../controllers/internshipController");

const { protect } = require("../middleware/authMiddleware");

// Test route
router.get("/test", (req, res) => {
  console.log("Internship test route hit");
  res.json({ message: "Internship route working!" });
});

// GET all internships (Public or protected, your choice)
router.get("/", getAllInternships);

// POST create internship (Only admin or hr)
router.post("/", protect, (req, res, next) => {
  const role = req.user.role;
  if (role !== "admin" && role !== "hr") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
}, createInternship);

// PUT update internship (Only admin or hr)
router.put("/:id", protect, (req, res, next) => {
  const role = req.user.role;
  if (role !== "admin" && role !== "hr") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
}, updateInternship);

// DELETE internship (Only admin or hr)
router.delete("/:id", protect, (req, res, next) => {
  const role = req.user.role;
  if (role !== "admin" && role !== "hr") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
}, deleteInternship);

// POST apply for internship (Only students)
router.post("/:id/apply", protect, (req, res, next) => {
  const role = req.user.role;
  if (role !== "student") {
    return res.status(403).json({ message: "Only students can apply" });
  }
  next();
}, applyForInternship);

// GET user applications (for logged-in users)
router.get("/my-applications", protect, getUserApplications);

module.exports = router;
