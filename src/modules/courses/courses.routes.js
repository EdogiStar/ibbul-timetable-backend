const express = require("express");

const router = express.Router();

const coursesController = require("./courses.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Course
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  coursesController.createCourse
);

// Get All Courses
router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  coursesController.getAllCourses
);

// Get Course By ID
router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  coursesController.getCourseById
);

// Update Course
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  coursesController.updateCourse
);

// Delete Course
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  coursesController.deleteCourse
);

module.exports = router;