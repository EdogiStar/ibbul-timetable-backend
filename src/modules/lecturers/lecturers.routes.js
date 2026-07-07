const express = require("express");

const router = express.Router();

const lecturersController = require("./lecturers.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Lecturer
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  lecturersController.createLecturer
);

// Get All Lecturers
router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  lecturersController.getAllLecturers
);

// Get Lecturer By ID
router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  lecturersController.getLecturerById
);

// Update Lecturer
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  lecturersController.updateLecturer
);

// Delete Lecturer
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  lecturersController.deleteLecturer
);

module.exports = router;