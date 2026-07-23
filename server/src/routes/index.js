const express = require("express");

const authRoutes = require("./authRoutes");

const router = express.Router();

// Authentication Routes
router.use("/auth", authRoutes);

module.exports = router;