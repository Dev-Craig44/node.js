const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({ filename: "logfile.log" }),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
  exitOnError: true,
  exceptionHandlers: [
    new transports.File({ filename: "uncaughtExceptions.log" }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: "unhandledRejections.log" }),
  ],
});

module.exports = logger;
