var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const homeRouter = require("./routes/home");
const signupRouter = require("./routes/sign-up");
const loginRouter = require("./routes/log-in");
const logoutRouter = require("./routes/logout");
const joinRouter = require("./routes/join");
const newMessageRouter = require("./routes/new-message");
const adminRouter = require("./routes/admin");

var app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || "";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Passport auth
require("./config/passport");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);
app.use("/logout", logoutRouter);
app.use("/home", homeRouter);
app.use("/join", joinRouter);
app.use("/new-message", newMessageRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
