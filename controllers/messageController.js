const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Messages.
exports.message_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message list");
});

// Display Message create form on GET.
exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message create GET");
});

// Handle Message create on POST.
exports.message_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message create POST");
});

//<----- TO IMPLEMENT LATER FOR ADMIN ----->//

// Display Message delete form on GET.
exports.message_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message delete GET");
});

// Handle Message delete on POST.
exports.message_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Message delete POST");
});
