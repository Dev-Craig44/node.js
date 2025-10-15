const config = require("config");

module.exports = function () {
  if (
    !process.env.vidly_jwtPrivateKey &&
    process.env.NODE_ENV !== "production"
  ) {
    process.env.vidly_jwtPrivateKey = "dev_jwtPrivateKey";
    console.warn(
      "WARNING: vidly_jwtPrivateKey not set — using temporary development key. Do NOT use in production."
    );
  }

  if (!config.get("jwtPrivateKey")) {
    // Instead of console.log, use our current infrastructure to cache this error
    //   1.) throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
    //  Make sure that you always throw an error object instead of a string. Because if you throw a string, you won't get a stack trace.
  }
};
