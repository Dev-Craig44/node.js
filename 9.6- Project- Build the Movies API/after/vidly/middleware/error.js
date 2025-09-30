// 2.) Import winston here
const logger = require("../logging");

module.exports = function (err, req, res, next) {
  logger.error(err.message, { metadata: err });
  res.status(500).send("Something went wrong");
};
