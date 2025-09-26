// 9.) Load our error module the we separate
const error = require("./middleware/error");
const config = require("config");
const mongoose = require("mongoose");
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

// give [jwtPrivate] string to the config {get} method and if not having the settings is true then give 'Fatal Error' message to the console {error} method
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");

  // [0] indicates success, anything else means failure

  // give [1] to the process object {exit} method
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/auth", auth);

// 3.) Add middleware function for our error catcher
// 10.) Pass our import error handling module here
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
