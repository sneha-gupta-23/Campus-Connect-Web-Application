const Application = require('../models/Application');
const Internship = require('../models/Internship');

exports.applyToInternship = async (req, res) => {
  const { internshipId } = req.params;
  try {
    const alreadyApplied = await Application.findOne({
      internship: internshipId,
      student: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied.' });
    }

    const newApp = await Application.create({
      internship: internshipId,
      student: req.user._id,
    });

    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const apps = await Application.find({ student: req.user._id }).populate('internship');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllApplicationsForInternship = async (req, res) => {
  try {
    const apps = await Application.find({ internship: req.params.id }).populate('student');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
