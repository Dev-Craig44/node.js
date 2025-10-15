require("express-async-errors");

const express = require("express");
const app = express();

// 7.) Import the logging startup file and before the routes and db startup files so that if there are any errors in those files, they will be logged.
require("./startup/logging");
require("./startup/config");
require("./startup/routes")(app);
require("./startup/db")();

const p = Promise.reject(new Error("Something failed miserably!"));
p.then(() => console.log("Done"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
