const express = require("express");

const controller = require("./timetable.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  controller.createTimetable
);

router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  controller.getAllTimetables
);

router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  controller.getTimetableById
);

router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  controller.updateTimetable
);

router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  controller.deleteTimetable
);

module.exports = router;