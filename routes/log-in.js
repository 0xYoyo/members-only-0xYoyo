const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

// GET request for creating a user.
router.get("/", user_controller.user_login_get);

// POST request for creating user.
router.post("/", user_controller.user_login_post);

module.exports = router;
