const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("🚀 CampusConnect Backend API is running");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/resources", require("./routes/studyResources"));
app.use("/api/internships", require("./routes/internshipRoutes"));
app.use("/api/applications", require("./routes/applications"));

// ✅ REQUIRED for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
