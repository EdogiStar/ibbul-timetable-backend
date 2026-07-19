const express = require("express");

const router = express.Router();

const timeSlotsController = require("./time-slots.controller");
const authMiddleware = require("../../middleware/auth.middleware");

/*
|--------------------------------------------------------------------------
| Super Admin Routes
|--------------------------------------------------------------------------
*/

// Create Time Slot
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  timeSlotsController.createTimeSlot
);

// Update Time Slot
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  timeSlotsController.updateTimeSlot
);

// Delete Time Slot
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  timeSlotsController.deleteTimeSlot
);

/*
|--------------------------------------------------------------------------
| Accessible to All Authenticated Users
|--------------------------------------------------------------------------
*/

// Get All Time Slots
router.get(
  "/",
  authMiddleware(),
  timeSlotsController.getAllTimeSlots
);

// Get Time Slot By ID
router.get(
  "/:id",
  authMiddleware(),
  timeSlotsController.getTimeSlotById
);

module.exports = router;