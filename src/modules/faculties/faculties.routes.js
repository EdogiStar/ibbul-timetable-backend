const express = require("express");

const router = express.Router();

const facultiesController = require("./faculties.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Faculty
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  facultiesController.createFaculty
);

// Get All Faculties
router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  facultiesController.getAllFaculties
);

// Get Faculty By ID
router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  facultiesController.getFacultyById
);

// Update Faculty
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  facultiesController.updateFaculty
);

// Delete Faculty
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  facultiesController.deleteFaculty
);

module.exports = router;