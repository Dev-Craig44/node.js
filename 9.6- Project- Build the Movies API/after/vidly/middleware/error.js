// 8.) Set the module export to the error middleware function we had in the index.js file
module.exports = function (next, req, res, next) {
  // 4.) Add logic for handling errors here
  res.status(500).res.send("Something went wrong");
};
