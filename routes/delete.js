const express = require("express");
const router = express.Router();
const message_controller = require("../controllers/messageController");
const isAdmin = require("./authMiddleware").isAdmin;

// POST request for deleting a message.
router.post("/", isAdmin, message_controller.message_delete_post);

module.exports = router;
