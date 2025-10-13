// 7.) Load express because we need it to define routes
const express = require("express");
// 6.) Paste our routers here because they are not referenced anywhere else
// 10.) Because our routes are in a different folder we need to adjust the paths. Use ../ to go up one level with cmd + d we can select all instances of ./routes and change them at once
const customers = require("../routes/customers");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const users = require("../routes/users");
const auth = require("../routes/auth");
// 9.) Load our error middleware because it is not referenced anywhere else
const error = require("../middleware/error");
// 1.) Export a function that takes no arguments
// 3.) We will add the `app` object because we only want a single instance of it which is created in index.js
module.exports = function (app) {
  // 2.) Here is where we define all our routes and other middleware.
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
