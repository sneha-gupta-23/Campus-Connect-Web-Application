// models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['applied', 'reviewed', 'selected', 'rejected'],
    default: 'applied',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Application', applicationSchema);
