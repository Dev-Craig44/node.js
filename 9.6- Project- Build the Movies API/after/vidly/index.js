require("express-async-errors");

if (!process.env.vidly_jwtPrivateKey && process.env.NODE_ENV !== "production") {
  process.env.vidly_jwtPrivateKey = "dev_jwtPrivateKey";
  console.warn(
    "WARNING: vidly_jwtPrivateKey not set — using temporary development key. Do NOT use in production."
  );
}

const config = require("config");
const express = require("express");
const app = express();

// 7.) Import the logging startup file and before the routes and db startup files so that if there are any errors in those files, they will be logged.
const logger = require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();

if (!config.get("jwtPrivateKey")) {
  logger.error("FATAL ERROR: jwtPrivateKey is not defined");
}

const p = Promise.reject(new Error("Something failed miserably!"));
p.then(() => console.log("Done"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
