const express = require("express");

const controller = require("./course-offerings.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  controller.createCourseOffering
);

router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  controller.getAllCourseOfferings
);

router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  controller.getCourseOfferingById
);

router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  controller.updateCourseOffering
);

router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  controller.deleteCourseOffering
);

module.exports = router;