const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { auth, requireAdmin } = require("../middleware/auth");

// public
router.post("/register", authController.register);
router.post("/login", authController.login);

// protected
router.get("/me", auth, userController.getMe);
router.get("/users", auth, requireAdmin, userController.getAllUsers);

module.exports = router;
