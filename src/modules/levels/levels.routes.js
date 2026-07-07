const express = require("express");

const router = express.Router();

const levelsController = require("./levels.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Level
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  levelsController.createLevel
);

// Get All Levels
router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  levelsController.getAllLevels
);

// Get Level By ID
router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  levelsController.getLevelById
);

// Update Level
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  levelsController.updateLevel
);

// Delete Level
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  levelsController.deleteLevel
);

module.exports = router;