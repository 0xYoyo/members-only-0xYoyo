const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Messages.
exports.message_list = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find()
    .sort({ timestamp: -1 })
    .populate("createdBy")
    .exec();

  const user = req.user || false;

  res.render("home", {
    title: "All messages",
    messages: allMessages,
    user: user,
  });
});

// Display Message create form on GET.
exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("new-message", { title: "New message" });
});

// Handle Message create on POST.
exports.message_create_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("title must be specified."),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("text must be specified."),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);

    // Create message
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      timestamp: Date.now(),
      createdBy: req.user._id,
    });

    if (!errors.isEmpty()) {
      // Rerender with value and errors
      res.render("new-message", {
        title: "New message",
        message: message,
        errors: errors.array(),
      });
      return;
    } else {
      // Save valid data and redirect to new page
      await message.save();
      return res.redirect("/home");
    }
  }),
];

//<----- TO IMPLEMENT LATER FOR ADMIN ----->//

// Handle Message delete on POST.
exports.message_delete_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.body.messageid);
  res.redirect("/home");
});
