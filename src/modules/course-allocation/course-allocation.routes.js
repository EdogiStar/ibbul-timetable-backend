const express = require("express");

const router = express.Router();

const courseAllocationController = require("./course-allocation.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Course Allocation
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  courseAllocationController.createCourseAllocation
);

// Get All Course Allocations
router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  courseAllocationController.getAllCourseAllocations
);

router.get(
  "/available",
  courseAllocationController.getAvailableCourseAllocations
);

// Get Course Allocation By ID
router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  courseAllocationController.getCourseAllocationById
);

// Update Course Allocation
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  courseAllocationController.updateCourseAllocation
);

// Delete Course Allocation
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  courseAllocationController.deleteCourseAllocation
);

module.exports = router;