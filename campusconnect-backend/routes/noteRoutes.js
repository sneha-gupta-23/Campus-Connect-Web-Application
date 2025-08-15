const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  createNote,
  getNotes,
  deleteNote
} = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", protect, getNotes);
router.post("/", protect, upload.single("file"), createNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;
