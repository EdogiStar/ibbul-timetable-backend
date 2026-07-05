const express = require("express");

const router = express.Router();

const usersController = require("./users.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// SUPER ADMIN ONLY
router.post(
  "/",
  authMiddleware("SUPER_ADMIN"),
  usersController.createUser
);

router.get(
  "/",
  authMiddleware("SUPER_ADMIN"),
  usersController.getAllUsers
);

router.get(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  usersController.getUserById
);

router.put(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  usersController.updateUser
);

router.delete(
  "/:id",
  authMiddleware("SUPER_ADMIN"),
  usersController.deleteUser
);

module.exports = router;