// 3.) Import winston
const winston = require("winston");

module.exports = function (err, req, res, next) {
  // 4.) Call winston.log to log the exception, 1st arg is log level, 2nd is message
  winston.error(err.message, err);
  res.status(500).send("Something failed.");
};
