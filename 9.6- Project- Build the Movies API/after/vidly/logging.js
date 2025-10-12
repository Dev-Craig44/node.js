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
    // 3.) File transport specifically for `logfile.log` so a lightweight,
    // ordered log file exists for quick inspection. This is the file you
    // previously looked for and found empty.
    // (Comment 1) This ensures the file receives entries even if MongoDB
    // transport fails to initialize.
    new transports.File({ filename: "logfile.log" }),
    // 3.) File transport for errors.
    new transports.File({ filename: "error.log", level: "error" }),
    // 4.) File transport for all combined logs.
    new transports.File({ filename: "combined.log" }),
  ],
  // 5.) When relying on Winston's exception/rejection handlers we enable
  //     exitOnError so the process terminates after a fatal exception. This
  //     keeps behavior consistent with our previous explicit process.exit(1)
  //     and avoids leaving the app in an undefined state.
  //     (Comment 2) Winston will call the configured handlers before exiting.
  exitOnError: true,
  // 6.) Have Winston handle uncaught exceptions and unhandled rejections.
  //     (User requested file name: `uncaughtExeptions` — we respect the
  //     exact spelling and append a .log extension.)
  exceptionHandlers: [
    new transports.File({ filename: "uncaughtExeptions.log" }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: "unhandledRejections.log" }),
  ],
});

// 6.) Export the configured logger for use across the app.
module.exports = logger;
