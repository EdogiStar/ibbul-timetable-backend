const express = require("express");

const router = express.Router();

const semestersController = require("./semesters.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Semester
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  semestersController.createSemester
);

// Get All Semesters
router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  semestersController.getAllSemesters
);

// Get Semester By ID
router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  semestersController.getSemesterById
);

// Update Semester
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  semestersController.updateSemester
);

// Delete Semester
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  semestersController.deleteSemester
);

module.exports = router;