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

require("./startup/routes")(app);
// 7.) Import the DB startup file and invoke the exported function
require("./startup/db")();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
}

const p = Promise.reject(new Error("Something failed miserably!"));
p.then(() => console.log("Done"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
