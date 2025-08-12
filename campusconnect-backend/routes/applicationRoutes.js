const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  applyToInternship,
  getUserApplications,
  getAllApplicationsForInternship,
} = require('../controllers/applicationController');

const router = express.Router();

router.post('/:internshipId', protect, applyToInternship);
router.get('/my', protect, getUserApplications);
router.get('/internship/:id', protect, getAllApplicationsForInternship); // For Admin/HR

module.exports = router;
