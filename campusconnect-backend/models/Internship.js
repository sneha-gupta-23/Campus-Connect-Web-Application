// backend/models/Internship.js
const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  // 🔹 Basic Details
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, default: 'Remote' },
  stipend: { type: String, default: 'Unpaid' },
  duration: { type: String }, // e.g. "3 months"
  skills: [{ type: String }],

  // 🔹 Application Deadline
  applyBy: { type: Date },

  // 🔹 Internship or Placement
  type: { 
    type: String, 
    enum: ['internship', 'placement'], 
    default: 'internship' 
  },

  // 🔹 Creator Info (Admin / HR)
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  // 🔹 Internship Status (Active / Closed)
  status: { 
    type: String, 
    default: 'Actively Hiring' 
  },

  // 🔹 Optional UI Enhancements (Frontend Display)
  color: { type: String, default: '#e0f7fa' },
  icon: { type: String, default: '💼' },

  // 🔹 Applicants Array
  applicants: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      appliedAt: { type: Date, default: Date.now },
      status: { 
        type: String, 
        enum: ['applied', 'shortlisted', 'rejected', 'hired'], 
        default: 'applied' 
      },
      resumeLink: { type: String } // optional: URL to student's resume
    }
  ],

  // 🔹 Date Metadata
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Internship', InternshipSchema);
