require("express-async-errors");

// Development convenience: if the vidly_jwtPrivateKey env var is not set,
// provide a temporary, non-production key so the app can start locally
// without exiting. In production we still require a real key.
if (!process.env.vidly_jwtPrivateKey && process.env.NODE_ENV !== "production") {
  process.env.vidly_jwtPrivateKey = "dev_jwtPrivateKey";
  console.warn(
    "WARNING: vidly_jwtPrivateKey not set — using temporary development key. Do NOT use in production."
  );
}

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

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");

  // process.exit(1);
}

const mongoUri = process.env.MONGO_URI || "mongodb://localhost/vidly";

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(() => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
