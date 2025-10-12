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

// 1.) use the built-in Node.js event emitter to handle uncaught exceptions, and use the second argument to log the exception message and stack trace.
process.on("uncaughtException", (ex) => {
  // (1) Use Winston to record uncaught exceptions. We avoid console.* here
  // so the runtime doesn't print duplicate messages when the app is
  // supervised by a process manager that captures stdout/stderr.
  logger.error("uncaughtException", ex);
  // (2) Exit to avoid inconsistent state after an uncaught exception.
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  // (1) Record the rejection via Winston. Avoid console.* to keep logs
  // centralized in the configured transports (files / MongoDB).
  logger.error("unhandledRejection", { reason, promise });
  // (2) Exit process after logging.
  process.exit(1);
});

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
      // (Comment 2) Prefer attaching the MongoDB transport using a *connected*
      // client so the transport can enqueue operations against the live
      // DB. Mongoose's connection exposes the underlying client in different
      // properties depending on version, so try multiple ways.
      // 1) If mongoose exposes getClient(), use it to obtain a connected
      //    MongoClient (modern mongoose).
      // 2) Otherwise, try the legacy `mongoose.connection.client`.
      // 3) As a fallback, pass the original URI string — the transport will
      //    create its own connection.
      let mongoTransportOpts = {
        collection: "logs",
        level: "error",
        tryReconnect: true,
      };

      // Attempt 1: connected client -> pass a db object
      const mongooseClient =
        mongoose.connection &&
        typeof mongoose.connection.getClient === "function"
          ? mongoose.connection.getClient()
          : (mongoose.connection && mongoose.connection.client) || null;

      if (mongooseClient) {
        // If we have a MongoClient, pass the connected DB object so the
        // transport doesn't need to create a new connection.
        mongoTransportOpts.db = mongooseClient.db
          ? mongooseClient.db()
          : mongooseClient;
      } else {
        // Fallback: give the transport the URI string to let it connect.
        mongoTransportOpts.db = mongoUri;
      }

      logger.add(new MongoDB(mongoTransportOpts));
      console.log("MongoDB transport attached to logger ✅");
    } catch (ex) {
      console.error(
        "Failed to attach MongoDB transport to logger:",
        ex.message
      );
    }
  })
  .catch(() => console.error("Could not connect to MongoDB..."));

// 1.) Replace this error with a rejected promise
const p = Promise.reject(new Error("Something failed miserably!"));

// 2.) call the promise, but don't use a catch handler so we'll have a unhandled rejection
p.then(() => console.log("Done"));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
