const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    author: String,
    body: String,
    hidde: Boolean,
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
