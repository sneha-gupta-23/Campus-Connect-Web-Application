const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
  file: String,
  uploadedBy: String,
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
