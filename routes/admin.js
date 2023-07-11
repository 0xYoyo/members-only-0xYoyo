const express = require("express");
const router = express.Router();
const isAuth = require("./authMiddleware").isAuth;

const user_controller = require("../controllers/userController");

// GET request for updating admin user.
router.get("/", isAuth, user_controller.user_admin_get);

// POST request for updating admin user.
router.post("/", isAuth, user_controller.user_admin_post);

module.exports = router;
