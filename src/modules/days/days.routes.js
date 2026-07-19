const express = require("express");

const router = express.Router();

const daysController = require("./days.controller");
const authMiddleware = require("../../middleware/auth.middleware");

/*
|--------------------------------------------------------------------------
| Super Admin Routes
|--------------------------------------------------------------------------
*/

// Create Day
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  daysController.createDay
);

// Update Day
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  daysController.updateDay
);

// Delete Day
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  daysController.deleteDay
);

/*
|--------------------------------------------------------------------------
| Accessible to All Authenticated Users
|--------------------------------------------------------------------------
*/

// Get All Days
router.get(
  "/",
  authMiddleware(),
  daysController.getAllDays
);

// Get Day By ID
router.get(
  "/:id",
  authMiddleware(),
  daysController.getDayById
);

module.exports = router;