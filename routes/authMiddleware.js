module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const err = new Error("You are not authorized to view this resource");
    err.status = 401;
    return next(err);
  }
};
