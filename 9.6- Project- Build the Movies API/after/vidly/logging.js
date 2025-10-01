// 1.) Import the parts of Winston we need: a logger factory, output transports, and format helpers
const { createLogger, transports, format } = require("winston");

// 2.) Create a logger instance that the rest of the app can use
const logger = createLogger({
  // 3.) Set the minimum log level... anything at this level or higher will be logged
  level: "info",

  // 4.) Define the default log format for file outputs... add timestamps, capture error stacks, and serialize as JSON
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),

  // 5.) Tell Winston where to send logs (the transports)
  transports: [
    // 6.) Write all logs (info and above) to combined.log so you have a full history
    new transports.File({ filename: "combined.log" }),

    // 7.) Write only error-level logs to error.log so failures are easy to find
    new transports.File({ filename: "error.log", level: "error" }),

    // 8.) Also echo logs to the console for live dev feedback using a human-friendly format
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, stack }) =>
          stack ? `${level}: ${message}\n${stack}` : `${level}: ${message}`
        )
      ),
    }),
  ],

  // 9.) If something crashes without being caught, record it in exceptions.log
  exceptionHandlers: [new transports.File({ filename: "exceptions.log" })],

  // 10.) If a Promise is rejected and not handled, record it in rejections.log
  rejectionHandlers: [new transports.File({ filename: "rejections.log" })],
});

// 11.) Export the logger so other files can require and use it
module.exports = logger;
