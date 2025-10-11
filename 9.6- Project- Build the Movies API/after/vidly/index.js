require("express-async-errors");

if (!process.env.vidly_jwtPrivateKey && process.env.NODE_ENV !== "production") {
  process.env.vidly_jwtPrivateKey = "dev_jwtPrivateKey";
  console.warn(
    "WARNING: vidly_jwtPrivateKey not set — using temporary development key. Do NOT use in production."
  );
}

const error = require("./middleware/error");
const config = require("config");
const mongoose = require("mongoose");
const logger = require("./logging");
const { MongoDB } = require("winston-mongodb");
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");

  // process.exit(1);
}

const mongoUri = process.env.MONGO_URI || "mongodb://localhost/vidly";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB...");
    try {
      logger.add(
        new MongoDB({
          db: mongoUri,
          collection: "logs",
          level: "error",
          tryReconnect: true,
        })
      );
      console.log("MongoDB transport attached to logger ✅");
    } catch (ex) {
      console.error(
        "Failed to attach MongoDB transport to logger:",
        ex.message
      );
    }
  })
  .catch(() => console.error("Could not connect to MongoDB..."));

throw new Error("Something failed during startup.");

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
