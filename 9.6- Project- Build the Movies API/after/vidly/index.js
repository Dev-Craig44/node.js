// 1.) Initialize logging as the first thing so every later module can log safely
const logger = require("./logging");

// 2.) Prove the logger is live (you'll see this in console and combined.log)
logger.info("Logger initialized ✅");

require("express-async-errors");
const error = require("./middleware/error");
const config = require("config");
const mongoose = require("mongoose");
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

// 3.) Check for required jwtPrivateKey in config
if (!config.get("jwtPrivateKey")) {
  logger.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
} else {
  logger.info("jwtPrivateKey loaded successfully ✅");
}

// 4.) Connect to MongoDB
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => logger.info("Connected to MongoDB..."))
  .catch((err) => logger.error("Could not connect to MongoDB...", err));

// 5.) Register middleware and routes
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/auth", auth);
// Register debug routes only when explicitly enabled to avoid accidental exposure
let dbDebug;
if (
  process.env.ENABLE_DEBUG_ROUTES === "1" ||
  process.env.ENABLE_DEBUG_ROUTES === "true"
) {
  dbDebug = require("./routes/db-debug");
  app.use("/api/_debug/db", dbDebug);
  logger.warn("Debug routes enabled: /api/_debug/db (only enable locally) ⚠️");
} else {
  logger.info("Debug routes disabled (set ENABLE_DEBUG_ROUTES=1 to enable)");
}

logger.info("Routes registered ✅");

// 6.) Register global error handler
app.use(error);

// 7.) Start server
const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
