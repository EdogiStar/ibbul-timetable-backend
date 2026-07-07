const express = require("express");

const router = express.Router();

const venuesController = require("./venues.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Venue
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  venuesController.createVenue
);

// Get All Venues
router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  venuesController.getAllVenues
);

// Get Venue By ID
router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  venuesController.getVenueById
);

// Update Venue
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  venuesController.updateVenue
);

// Delete Venue
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  venuesController.deleteVenue
);

module.exports = router;