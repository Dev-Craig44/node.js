// 1.) Import Winston and destructure the object to pull the objects we need
const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  timestamp: [
    new transports.Console(),
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

module.exports = logger;
