const express = require("express");
const router = express.Router();
const isAuth = require("./authMiddleware").isAuth;

const user_controller = require("../controllers/userController");

// GET request for updating a user.
router.get("/", isAuth, user_controller.user_update_get);

// POST request for updating user.
router.post("/", isAuth, user_controller.user_update_post);

module.exports = router;
