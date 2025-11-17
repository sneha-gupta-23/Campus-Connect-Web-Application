// backend/controllers/internshipController.js
const Internship = require("../models/Internship");
const mongoose = require("mongoose");

// ✅ Create Internship (Admin + HR)
exports.createInternship = async (req, res) => {
  try {
    if (!["HR", "Admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const data = req.body;
    data.createdBy = req.user._id;

    const internship = await Internship.create(data);
    res.status(201).json(internship);
  } catch (err) {
    console.error("❌ Create Internship Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Internships (with filters + pagination)
exports.getAllInternships = async (req, res) => {
  try {
    const { type, search, skill, page = 1, limit = 12 } = req.query;
    const query = {};

    if (type) query.type = type;
    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { company: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }
    if (skill) query.skills = { $in: [skill] };

    const skip = (page - 1) * limit;
    const total = await Internship.countDocuments(query);

    const internships = await Internship.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("createdBy", "name role");

    res.json({ total, page: parseInt(page), internships });
  } catch (err) {
    console.error("❌ Get Internships Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Internship by ID
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate("createdBy", "name role")
      .populate("applicants.student", "name email");

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    res.json(internship);
  } catch (err) {
    console.error("❌ Get By ID Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Internship (Admin or Creator HR)
exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    if (
      String(internship.createdBy) !== String(req.user._id) &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    Object.assign(internship, req.body);
    await internship.save();
    res.json(internship);
  } catch (err) {
    console.error("❌ Update Internship Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Internship (Admin or Creator HR)
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    if (
      String(internship.createdBy) !== String(req.user._id) &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    await internship.deleteOne();
    res.json({ message: "Internship deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Internship Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Apply for Internship (Students Only)
exports.applyForInternship = async (req, res) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(403).json({ message: "Only students can apply" });
    }

    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    // check if already applied
    const alreadyApplied = internship.applicants.find(
      (a) => String(a.student) === String(req.user._id)
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied" });
    }

    internship.applicants.push({
      student: req.user._id,
      resumeLink: req.body.resumeLink || "",
    });

    await internship.save();
    res.json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("❌ Apply Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
