const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  mode: String, // e.g., Remote, Hybrid, In-office
  duration: String,
  stipend: String,
  category: String,
  description: String,
  requirements: String,
  lastDate: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Internship", internshipSchema);
