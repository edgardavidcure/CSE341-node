const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Comment = require("../models/Comment");
const comments = require("./comments");

router.use("/", require("./swagger"));
router.use("/comments", comments);
//@desc LOGIN/Landing Page
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

//@desc LOGIN/Landing Page
router.get("/dashboard", ensureAuth, async (req, res) => {
  console.log(req.user);
  try {
    const comments = await Comment.find({ user: req.user.id })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("dashboard", {
      name: req.user.firstName,

      comments,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

module.exports = router;
