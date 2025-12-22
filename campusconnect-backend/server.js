const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (IMPORTANT for testing)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 CampusConnect Backend API is running",
  });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/resources", require("./routes/studyResources"));
app.use("/api/internships", require("./routes/internshipRoutes"));
app.use("/api/applications", require("./routes/applications"));

// ❌ DO NOT use app.listen() on Vercel

module.exports = app;   // ✅ EXPORT APP
