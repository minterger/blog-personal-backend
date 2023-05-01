const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    author: { type: String, required: true },
    body: { type: String, required: true },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
