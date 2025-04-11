// export admin middleware
module.exports = function (req, res, next) {
  // our middleware function sets req.user to the user object that was found in the database
  // 401 = Unauthorized
  // 403 = Forbidden
  // give [Access Denied] string message to the express {send} method and pass [403] to the express {status} method after checking if [req.user.isAdmin] being one is not true
  if (!req.user.isAdmin)
    return res.status(403).send("Access denied. You are not an admin.");

  // if the user is an admin, call the next middleware function
  next();
};
