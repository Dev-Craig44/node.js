// 1.) Create a async middleware function and pass it a handler
// 6.) Delete async because we're passing a async handler
module.export = function (handler) {
  // 5.) Return a router handler function and move our logic inside of it
  return async (req, res, next) => {
    // 2.) Make a try/catch block that can be used with each handler
    await handler();
    try {
    } catch (ex) {
      next(ex);
    }
  };
};
