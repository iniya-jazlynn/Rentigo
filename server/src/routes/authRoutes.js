const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getCurrentUser);

router.post("/logout", protect, logoutUser);

module.exports = router;