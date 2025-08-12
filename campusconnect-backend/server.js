const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route Imports
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Add this before error handlers
app.get("/", (req, res) => {
  res.send({ message: "Backend server running!" });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/applications', applicationRoutes);

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

// 404 - Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
