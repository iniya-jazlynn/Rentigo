const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

// Security Middleware
app.use(helmet());

// Compress API responses
app.use(compression());

// Logging
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RENTIGO Backend is Running 🚀",
  });
});

module.exports = app;
