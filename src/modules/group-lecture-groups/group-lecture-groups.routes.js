const express = require("express");

const controller = require("./group-lecture-groups.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  controller.create
);

router.get(
  "/",
  authMiddleware(),
  controller.findAll
);

router.get(
  "/:id",
  authMiddleware(),
  controller.findById
);

router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  controller.update
);

router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  controller.delete
);

module.exports = router;