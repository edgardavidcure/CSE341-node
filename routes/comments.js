const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Comment = require("../models/Comment");
const commentsController = require("../controllers/comments");
const { commentValidation, validate } = require("../validation");

//@desc Show add page
router.get("/add", ensureAuth, (req, res) => {
  res.render("comments/add");
});

// process add form
router.post(
  "/",
  ensureAuth,
  commentValidation,
  validate,
  commentsController.addComment
);

//@desc Show all comments
router.get("/", ensureAuth, commentsController.getAllComments);

//@desc Show single comment
router.get("/:id", ensureAuth, commentsController.getSingleComment);

//@desc Show edit page
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.id,
    }).lean();

    if (!comment) {
      return res.render("error/404");
    }
    if (comment.user != req.user.id) {
      res.redirect("/comments");
    } else {
      res.render("comments/edit", {
        comment,
      });
    }
  } catch (error) {
    console.error(error);
    res.redirect("error/500");
  }
});

//@desc Update comment
router.put(
  "/:id",
  ensureAuth,
  commentValidation,
  validate,
  commentsController.updateSingleComment
);

//@desc Delete comments
router.delete("/:id", ensureAuth, commentsController.deleteSingleComment);

module.exports = router;
