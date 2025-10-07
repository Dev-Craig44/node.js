const { createLogger, transports, format } = require("winston");

// 1.) Create a winston v3 logger using createLogger.
//     Keep formats simple (timestamp + json) so logs are structured.
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // 2.) Console transport for development (colorized + simple output).
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    // 3.) File transport for errors.
    new transports.File({ filename: "error.log", level: "error" }),
    // 4.) File transport for all combined logs.
    new transports.File({ filename: "combined.log" }),
  ],
  // 5.) Don't exit on handled exceptions — let express handle process lifecycle.
  exitOnError: false,
});

// 6.) Export the configured logger for use across the app.
module.exports = logger;
