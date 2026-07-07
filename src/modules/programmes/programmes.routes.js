const express = require("express");

const router = express.Router();

const programmesController = require("./programmes.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Programme
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  programmesController.createProgramme
);

// Get All Programmes
router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  programmesController.getAllProgrammes
);

// Get Programme By ID
router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  programmesController.getProgrammeById
);

// Update Programme
router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  programmesController.updateProgramme
);

// Delete Programme
router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  programmesController.deleteProgramme
);

module.exports = router;