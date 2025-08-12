const express = require('express');
const router = express.Router();
const StudyResource = require('../models/StudyResource');

// Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await StudyResource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload a new resource
router.post('/', async (req, res) => {
  const { title, description, link, subject, uploadedBy } = req.body;

  const newResource = new StudyResource({
    title,
    description,
    link,
    subject,
    uploadedBy,
  });

  try {
    const saved = await newResource.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
