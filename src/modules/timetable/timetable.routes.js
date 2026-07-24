const express = require("express");

const controller = require("./timetable.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Timetable Generation
|--------------------------------------------------------------------------
*/
router.post(
  "/generate",
  authMiddleware("SUPER_ADMIN"),
  controller.generateTimetable
);

router.post(
  "/group/generate",
  authMiddleware("SUPER_ADMIN"),
  controller.generateGroupTimetable
);

router.post(
  "/normal/generate",
  authMiddleware("SUPER_ADMIN"),
  controller.generateNormalTimetable
);

router.post(
  "/normal/generate-single",
  authMiddleware("SUPER_ADMIN"),
  controller.generateNormalTimetableForOne
);

router.post(
  "/normal/generate-single",
  authMiddleware("SUPER_ADMIN"),
  controller.generateSingleNormalTimetable
);

/*
|--------------------------------------------------------------------------
| Timetable Management
|--------------------------------------------------------------------------
*/

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
    "/available-venues",
    timetableController.getAvailableVenues
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