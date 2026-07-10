const express = require("express");
const router = express.Router();

const dashboardController = require("./dashboard.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Only authenticated users can access the dashboard
router.get(
  "/",
  authMiddleware(),
  dashboardController.getDashboardStats
);

module.exports = router;