require("express-async-errors");

if (!process.env.vidly_jwtPrivateKey && process.env.NODE_ENV !== "production") {
  process.env.vidly_jwtPrivateKey = "dev_jwtPrivateKey";
  console.warn(
    "WARNING: vidly_jwtPrivateKey not set — using temporary development key. Do NOT use in production."
  );
}

const config = require("config");
const mongoose = require("mongoose");
const logger = require("./logging");
const { MongoDB } = require("winston-mongodb");

const express = require("express");
const app = express();

require("./startup/routes")(app);

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
}

const mongoUri = process.env.MONGO_URI || "mongodb://localhost/vidly";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB...");
    try {
      const mongoTransportOpts = {
        collection: "logs",
        level: "error",
        tryReconnect: true,
      };

      const mongooseClient =
        mongoose.connection &&
        typeof mongoose.connection.getClient === "function"
          ? mongoose.connection.getClient()
          : (mongoose.connection && mongoose.connection.client) || null;

      mongoTransportOpts.db = mongooseClient
        ? mongooseClient.db
          ? mongooseClient.db()
          : mongooseClient
        : mongoUri;

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

const p = Promise.reject(new Error("Something failed miserably!"));
p.then(() => console.log("Done"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
