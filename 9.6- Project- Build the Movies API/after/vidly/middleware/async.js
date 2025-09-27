module.export = function (handler) {
  return async (req, res, next) => {
    await handler();
    try {
    } catch (ex) {
      next(ex);
    }
  };
};
