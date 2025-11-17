const express = require("express");
const router = express.Router();
const {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  applyForInternship,
} = require("../controllers/internshipController");
const { protect } = require("../middleware/authMiddleware");

// Public
router.get("/", getAllInternships);
router.get("/:id", getInternshipById);

// Protected (JWT)
router.post("/", protect, createInternship);
router.put("/:id", protect, updateInternship);
router.delete("/:id", protect, deleteInternship);
router.post("/:id/apply", protect, applyForInternship);

module.exports = router;
