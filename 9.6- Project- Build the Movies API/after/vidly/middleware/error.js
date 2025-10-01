// 1.) Pull in our shared logger (logging.js)
const logger = require("../logging");

// 2.) Export an Express error-handling middleware (four params signals "this handles errors")
module.exports = function (err, req, res, next) {
  // 3.) Log the error with useful request context to help debugging later
  logger.error(err.message, {
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    body: req.body,
  });

  // 4.) Send a generic 500 so we don't leak internals to clients
  res.status(500).send("Something failed.");
};
