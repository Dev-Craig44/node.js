require("express-async-errors");

if (!process.env.vidly_jwtPrivateKey && process.env.NODE_ENV !== "production") {
  process.env.vidly_jwtPrivateKey = "dev_jwtPrivateKey";
  console.warn(
    "WARNING: vidly_jwtPrivateKey not set — using temporary development key. Do NOT use in production."
  );
}
//  8.) Grab our error middleware because it is not referenced anywhere else
const config = require("config");
const mongoose = require("mongoose");
const logger = require("./logging");
const { MongoDB } = require("winston-mongodb");
// 5.) All of these should be moved to our new module because they have not been referenced anywhere else

const express = require("express");
const app = express();
// 4.) Load up our new module which returns a function to initialize
require("./startup/routes")(app);

// (1) We now rely on Winston's `exceptionHandlers` and `rejectionHandlers`
//     (configured in `logging.js`) to capture uncaught exceptions and
//     unhandled promise rejections. Those handlers write to dedicated files
//     (`uncaughtExeptions.log` and `unhandledRejections.log`) and, because
//     `exitOnError: true` is set, the process will terminate after a fatal
//     error. This keeps logging centralized and removes duplicate console
//     output during crashes.

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

// cut this part and put it in startup/routes.js

app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
