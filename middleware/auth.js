const jwt = require("jsonwebtoken");
const config = require("config");

// create function that takes 3 parameters [req, res, next] and call it auth
// this function will be used as a middleware function to authenticate the user and protect the routes
module.exports = function auth(req, res, next) {
  // give [x-auth-token] string to the express {header} method and put it in a [token] variable
  const token = req.header("x-auth-token");

  // if [token] not being there is true, give [Access denied] string to the express {send} method after we give [401] to the express {status} method **DEAD**
  if (!token) return res.status(401).send("Access denied.");

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
