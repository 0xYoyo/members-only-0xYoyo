const express = require("express");
const router = express.Router();

// Require controller modules.
const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", { title: "Home", user: req.user });
});

module.exports = router;
