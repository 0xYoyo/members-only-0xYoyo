const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");

// GET request for logging out a user.
router.post("/", user_controller.user_logout_post);

module.exports = router;
