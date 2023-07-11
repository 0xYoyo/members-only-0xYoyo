const express = require("express");
const router = express.Router();
const isAuth = require("./authMiddleware").isAuth;

const message_controller = require("../controllers/messageController");

// GET request for creating a message.
router.get("/", isAuth, message_controller.message_create_get);

// POST request for creating message.
router.post("/", isAuth, message_controller.message_create_post);

module.exports = router;
