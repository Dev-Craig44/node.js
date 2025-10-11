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
const jwt = require("jsonwebtoken");
const config = require("config");

// create function that takes 3 parameters [req, res, next] and call it auth
// this function will be used as a middleware function to authenticate the user and protect the routes
module.exports = function auth(req, res, next) {
  // give [x-auth-token] string to the express {header} method and put it in a [token] variable
  const token = req.header("x-auth-token");

  // if [token] not being there is true, give [Access denied] string to the express {send} method after we give [401] to the express {status} method **DEAD**
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // give the [jwtPrivateKey] string to the config {get} method as the second argument and the [token] variable to the jwt {verify} method and put it in a [decoded] variable
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    // give the [decoded] variable to the request object {user} method
    // this will have the user object that was encoded in the token
    // we did this so we can use this information in the next middleware function
    req.user = decoded;

    // call the next middleware function in the stack
    next();
  } catch (error) {
    // give [Invalid message] to the express {send} method after we give [400] (the code is 400 because that is bad request | client sent wrong data) to the express {status} method **DEAD**
    res.status(400).send("Invalid token.");
  }
};
