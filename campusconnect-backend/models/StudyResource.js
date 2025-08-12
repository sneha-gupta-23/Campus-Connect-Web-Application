const mongoose = require('mongoose');

const studyResourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  subject: String,
  uploadedBy: String, // could be user name or role
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('StudyResource', studyResourceSchema);
