const express = require("express");

const router = express.Router();

const sessionsController = require("./sessions.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Session
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  sessionsController.createSession
);

// Get All Sessions
router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  sessionsController.getAllSessions
);

// Get Session By ID
router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  sessionsController.getSessionById
);

// Update Session
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  sessionsController.updateSession
);

// Delete Session
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  sessionsController.deleteSession
);

module.exports = router;