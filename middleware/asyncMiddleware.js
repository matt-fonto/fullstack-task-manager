const asyncMiddleware = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      //used to pass any caught errors to the next middleware in the chain
      //passing the error to the next middleware
      //If next isn't called the request will be left hanging and the client will eventually time out
      next(error);
    }
  };
};

module.exports = asyncMiddleware;
