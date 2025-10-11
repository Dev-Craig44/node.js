// 1) Import jsonwebtoken so we can verify and decode JWTs.
const jwt = require("jsonwebtoken");

// 2) Import the config module to read application settings (e.g. jwtPrivateKey).
const config = require("config");

// 3) Export the middleware function that Express will call with (req, res, next).
module.exports = function auth(req, res, next) {
  // 4) Read the JWT from the custom request header 'x-auth-token'.
  const token = req.header("x-auth-token");

  // 5) If there is no token, immediately respond with 401 Unauthorized.
  if (!token) return res.status(401).send("Access denied. No token provided.");

  // 6) Attempt to verify the token and attach the decoded payload to req.user.
  try {
    // 7) Verify the token using the app's jwtPrivateKey and capture the decoded payload.
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    // 8) Attach the decoded payload (usually contains user id/role) to req.user for later middleware/handlers.
    req.user = decoded;

    // 9) Pass control to the next middleware or route handler.
    next();
  } catch (error) {
    // 10) If verification fails, respond with 400 Bad Request indicating an invalid token.
    res.status(400).send("Invalid token.");
  }
};
