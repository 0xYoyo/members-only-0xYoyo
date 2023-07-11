module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const err = new Error("You are not authorized to view this resource");
    err.status = 401;
    return next(err);
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    const err = new Error(
      "You are not authorized to view this resource - Not an admin"
    );
    err.status = 401;
    return next(err);
  }
};
