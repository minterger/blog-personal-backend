const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    title: String,
    author: String,
    body: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    hidden: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
