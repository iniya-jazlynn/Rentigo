require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 RENTIGO Server Running");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("=================================");
});