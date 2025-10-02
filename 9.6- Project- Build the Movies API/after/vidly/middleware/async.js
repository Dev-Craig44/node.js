// Async wrapper middleware: pass an async route handler and it will
// call it and forward any thrown error to next(err).
module.exports = function (handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
    } catch (ex) {
      next(ex);
    }
  };
};
