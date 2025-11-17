const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    status: { type: String, default: "Applied" }, // Applied / Accepted / Rejected
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
