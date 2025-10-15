const express = require("express");
const app = express();

// 7.) Import the logging startup file and before the routes and db startup files so that if there are any errors in those files, they will be logged.
const logger = require("./startup/logging");
require("./startup/config");
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3000;
// Use the logger to log that the app is listening on the port
app.listen(port, () => logger.info(`Listening on port ${port}...`));
