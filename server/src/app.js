const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Import Routes
const routes = require("./routes");

// Import Middlewares
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// =======================
// Security Middleware
// =======================
app.use(helmet());

// Compress API responses
app.use(compression());

// HTTP Request Logger
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// Parse Cookies
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// =======================
// Health Check Route
// =======================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RENTIGO Backend is Running 🚀",
  });
});

// =======================
// API Routes
// =======================
app.use("/api", routes);

// =======================
// 404 Handler
// =======================
app.use(notFound);

// =======================
// Global Error Handler
// =======================
app.use(errorHandler);

module.exports = app;