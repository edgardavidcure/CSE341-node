const Comment = require("../models/Comment");

const addComment = async (req, res) => {
  //#swagger.tags=['Comments']
  try {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    if (process.env.NODE_ENV === "developer") {
      const { productId, content, createdAt, rate, user } = req.body;
      const comment = new Comment({
        productId,
        content,
        createdAt,
        rate,
        user,
      });
      req.body.user = req.user.id;
      const data = await Comment.create(req.body);
      res.send(data);
    } else {
      req.body.user = req.user.id;
      await Comment.create(req.body);
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
};

const getAllComments = async (req, res) => {
  //#swagger.tags=['Comments']
  try {
    const comments = await Comment.find({ user: req.user.id })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    if (process.env.NODE_ENV === "developer") {
      res.send(comments);
    } else {
      res.render("comments/index", {
        comments,
      });
    }
  } catch (error) {
    console.log(error);
    res.render("error/500");
  }
};

const getSingleComment = async (req, res) => {
  //#swagger.tags=['Comments']
  try {
    let comment = await Comment.findById(req.params.id).populate("user").lean();
    if (process.env.NODE_ENV === "developer") {
      res.send(comment);
    } else {
      if (!comment) {
        return res.render("error/404");
      }
      if (comment.user._id != req.user.id) {
        res.redirect("/comments");
      } else {
        res.render("comments/show", { comment });
      }
    }
  } catch (error) {
    console.error(error);
    res.render("error/404");
  }
};

const updateSingleComment = async (req, res) => {
  //#swagger.tags=['Comments']
  try {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    if (process.env.NODE_ENV === "developer") {
      const { productId, content, createdAt, rate, user } = req.body;
      const comment = new Comment({
        productId,
        content,
        createdAt,
        rate,
        user,
      });
      const data = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!data) {
        res.status(404).send({
          message: `Cannot update Comment with id=${req.params.id}. Maybe Comment was not found!`,
        });
      } else {
        res.send({ message: "Comment was updated succesfully " });
      }
    } else {
      let comment = await Comment.findById(req.params.id).lean();

      if (!comment) {
        return res.render("error/404");
      }
      if (comment.user != req.user.id) {
        res.redirect("/comments");
      } else {
        comment = await Comment.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        res.redirect("/dashboard");
      }
    }
  } catch (error) {
    console.error(error);
    res.redirect("error/500");
  }
};

const deleteSingleComment = async (req, res) => {
  //#swagger.tags=['Comments']
  try {
    if (process.env.NODE_ENV === "developer") {
      const data = await Comment.findByIdAndRemove(req.params.id);
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Comment with id=${req.params.id}. Maybe Comment was not found!`,
        });
      } else {
        res.send({
          message: "Comment was deleted successfully!",
        });
      }
    } else {
      await Comment.deleteOne({ _id: req.params.id });
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    return res.render("error/500");
  }
};

module.exports = {
  getAllComments,
  getSingleComment,
  updateSingleComment,
  deleteSingleComment,
  addComment,
};
