const User = require("../models/user");
const session = require("express-session");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../config/passport");
require("dotenv").config();

// Display User create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up", { title: "Sign up" });
});

// Handle User create on POST.
exports.user_create_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified."),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("username must be specified.")
    .custom(async (username) => {
      const user = await User.findOne({ username: username });
      console.log(user);
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage("password must be longer than 5 characters."),
  body("passwordConfirm")
    .custom((passConf, { req }) => {
      return passConf === req.body.password;
    })
    .withMessage("Passwords don't match"),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);

    // Encrypt password and create user
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) return next(err);

      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        // Rerender with value and errors
        res.render("sign-up", {
          title: "Sign up",
          user: user,
          errors: errors.array(),
        });
        return;
      } else {
        // Save valid data and redirect to new page
        await user.save();
        req.login(user, function (err) {
          if (err) return next(err);
          return res.redirect("/home");
        });
      }
    });
  }),
];

// Display User login form on GET.
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("log-in", { title: "Log in" });
});

// Handle User login on POST.
exports.user_login_post = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("username must be specified."),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .escape()
    .withMessage("password must be longer than 5 characters."),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Rerender with value and errors
      res.render("log-in", {
        title: "Log in",
        username: req.body.username,
        errors: errors.array(),
      });
      return;
    } else {
      // Save valid data and redirect to new page
      passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/log-in",
      })(req, res, next);
    }
  }),
];

// Display User logout on GET.
exports.user_logout_post = asyncHandler(async (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    return res.redirect("/home");
  });
});

//<----- TO IMPLEMENT LATER FOR MEMBER JOIN & ADMIN ----->//

// Display User update form on GET.
exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.render("join", { title: "Join the club" });
});

// Handle User update on POST.
exports.user_update_post = [
  body("secretpass")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Secret password must be specified.")
    .custom((secretpass) => {
      return secretpass === process.env.CLUB_PASS;
    })
    .withMessage("Password is incorrect"),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);

    // Find the user and add membership
    const user = await User.findById(req.user._id);

    if (user === null) {
      // No results.
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    if (!errors.isEmpty()) {
      // Rerender with value and errors
      res.render("join", {
        title: "Join the club",
        errors: errors.array(),
      });
      return;
    } else {
      // Save valid data and redirect to new page
      user.member = true;
      await user.save();
      res.redirect("/home");
    }
  }),
];

// Display User admin form on GET.
exports.user_admin_get = asyncHandler(async (req, res, next) => {
  res.render("admin", { title: "Become an admin" });
});

// Handle User admin on POST.
exports.user_admin_post = [
  body("adminpass")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Admin password must be specified.")
    .custom((adminpass) => {
      return adminpass === process.env.ADMIN_PASS;
    })
    .withMessage("Password is incorrect"),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);

    // Find the user and add membership
    const user = await User.findById(req.user._id);

    if (user === null) {
      // No results.
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    if (!errors.isEmpty()) {
      // Rerender with value and errors
      res.render("admin", {
        title: "Become an admin",
        errors: errors.array(),
      });
      return;
    } else {
      // Save valid data and redirect to new page
      user.admin = true;
      await user.save();
      res.redirect("/home");
    }
  }),
];
