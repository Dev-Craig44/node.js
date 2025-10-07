// 1.) Import the centralized logger instance (from `logging.js`).
// 2.) Use the logger to record the error. We pass the Error object
//     in a meta property so the logger's format can include the stack.
const logger = require("../logging");

module.exports = function (err, req, res, next) {
  // 3.) Log the error and return a generic 500 response to clients.
  logger.error(err.message, { error: err });
  res.status(500).send("Something failed.");
};
