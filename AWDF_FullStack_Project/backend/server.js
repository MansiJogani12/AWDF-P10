const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// CHECK ENVIRONMENT VARIABLES
// ==========================================

if (!process.env.JWT_SECRET) {
  console.error("ERROR: JWT_SECRET is missing in .env");
  process.exit(1);
}

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// ROUTES
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "AWDF Practicals 1 to 9 Unified Full-Stack Backend Running",
    status: "Healthy",
    features: [
      "P4: Express REST API with CRUD",
      "P5: MongoDB & Mongoose Schema Validation",
      "P6: Full-Stack Integration with React",
      "P7: JWT Authentication & Middleware",
      "P9: NodeCache In-Memory Query Optimization"
    ],
    timestamp: new Date().toISOString()
  });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// ==========================================
// DATABASE CONNECTION AND SERVER
// ==========================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
