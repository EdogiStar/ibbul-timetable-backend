const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./modules/auth/auth.routes");

const authMiddleware = require("./middleware/auth.middleware");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const usersRoutes = require("./modules/users/users.routes");
const facultiesRoutes = require("./modules/faculties/faculties.routes");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IBBUL Timetable Backend is running successfully.",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Protected Route (Temporary)
app.get(
  "/api/v1/protected",
  authMiddleware("SUPER_ADMIN"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Access granted.",
      user: req.user,
    });
  }
);

// Authentication Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/faculties", facultiesRoutes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

module.exports = app;