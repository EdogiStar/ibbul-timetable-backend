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
const departmentsRoutes = require("./modules/departments/departments.routes");
const programmesRoutes = require("./modules/programmes/programmes.routes");
const levelsRoutes = require("./modules/levels/levels.routes");
const sessionsRoutes = require("./modules/sessions/sessions.routes");
const semestersRoutes = require("./modules/semesters/semesters.routes");
const lecturersRoutes = require("./modules/lecturers/lecturers.routes");
const studentsRoutes = require("./modules/students/students.routes");
const venuesRoutes = require("./modules/venues/venues.routes");
const coursesRoutes = require("./modules/courses/courses.routes");
const courseAllocationRoutes = require("./modules/course-allocation/course-allocation.routes");
const timetableRoutes = require("./modules/timetable/timetable.routes");
const courseOfferingsRoutes = require("./modules/course-offerings/course-offerings.routes");





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
app.use("/api/v1/departments", departmentsRoutes);
app.use("/api/v1/programmes", programmesRoutes);
app.use("/api/v1/levels", levelsRoutes);
app.use("/api/v1/sessions", sessionsRoutes);
app.use("/api/v1/semesters", semestersRoutes);
app.use("/api/v1/lecturers", lecturersRoutes);
app.use("/api/v1/students", studentsRoutes);
app.use("/api/v1/venues", venuesRoutes);
app.use("/api/v1/courses", coursesRoutes);
app.use("/api/v1/course-offerings", courseOfferingsRoutes);
app.use("/api/v1/course-allocations", courseAllocationRoutes);
app.use("/api/v1/timetables", timetableRoutes);




// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

module.exports = app;