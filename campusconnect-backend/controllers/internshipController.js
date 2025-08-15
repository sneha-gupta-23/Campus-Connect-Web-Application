const Internship = require("../models/Internship");
const Application = require("../models/Application");

// GET all internships (with optional filters)
const getAllInternships = async (req, res) => {
  try {
    const filters = {};
    const { category, location, mode, search } = req.query;

    if (category) filters.category = category;
    if (location) filters.location = location;
    if (mode) filters.mode = mode;
    if (search) {
      filters.title = { $regex: search, $options: "i" };
    }

    const internships = await Internship.find(filters).sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching internships" });
  }
};

// POST create internship (Admin or HR)
const createInternship = async (req, res) => {
  try {
    const {
      title, company, location, mode,
      duration, stipend, category,
      description, requirements, lastDate
    } = req.body;

    const newInternship = new Internship({
      title,
      company,
      location,
      mode,
      duration,
      stipend,
      category,
      description,
      requirements,
      lastDate,
      createdBy: req.user._id,
    });

    const saved = await newInternship.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating internship" });
  }
};

// PUT update internship (Admin or HR)
const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    const updated = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating internship" });
  }
};

// DELETE internship (Admin only)
const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: "Internship deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting internship" });
  }
};

// POST apply for internship (Student only)
const applyForInternship = async (req, res) => {
  try {
    const internshipId = req.params.id;
    const userId = req.user._id;

    // Check if already applied
    const existingApp = await Application.findOne({
      internship: internshipId,
      applicant: userId,
    });

    if (existingApp) {
      return res.status(400).json({ message: "You have already applied for this internship." });
    }

    const application = new Application({
      internship: internshipId,
      applicant: userId,
    });

    const saved = await application.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error applying for internship" });
  }
};

// GET logged-in user's internship applications (Student only)
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate("internship")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
};

module.exports = {
  getAllInternships,
  createInternship,
  updateInternship,
  deleteInternship,
  applyForInternship,
  getUserApplications,
};
