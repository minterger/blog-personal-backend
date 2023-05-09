const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
