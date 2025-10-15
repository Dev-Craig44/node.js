const mongoose = require("mongoose");
const logger = require("./logging");
const { MongoDB } = require("winston-mongodb");

module.exports = function () {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost/vidly";

  mongoose.connect(mongoUri).then(() => {
    logger.info("Connected to MongoDB...");
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
  });
};
