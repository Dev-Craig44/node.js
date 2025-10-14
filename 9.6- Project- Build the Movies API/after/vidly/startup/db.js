// 4.) Import the required modules
const mongoose = require("mongoose");
// 5.) Make sure that you change the path to your logging module.
const logger = require("../logging");
const { MongoDB } = require("winston-mongodb");
// 1.) Export a function
module.exports = function () {
  // 2.) Paste the DB logic here
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost/vidly";

  mongoose.connect(mongoUri).then(() => {
    // 3.) Replace console.log with logger.info to use Winston logger
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
  // 6.) Because we are not logging this let remove this console.error
};
