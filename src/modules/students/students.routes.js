const express = require("express");

const router = express.Router();

const studentsController = require("./students.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Student
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  studentsController.createStudent
);

// Get All Students
router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  studentsController.getAllStudents
);

// Get Student By ID
router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  studentsController.getStudentById
);

// Update Student
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  studentsController.updateStudent
);

// Delete Student
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  studentsController.deleteStudent
);

module.exports = router;