const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// Apply to a job (Students)
router.post("/", async (req, res) => {
  try {
    const { jobId, studentName, studentEmail } = req.body;

    // Prevent duplicate application
    const exists = await Application.findOne({ job: jobId, studentEmail });
    if (exists) return res.status(400).json({ message: "Already applied" });

    const application = new Application({ job: jobId, studentName, studentEmail });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get applications for a job
router.get("/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
