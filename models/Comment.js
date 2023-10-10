const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rate: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
