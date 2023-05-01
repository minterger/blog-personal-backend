const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    url: { type: String, required: true },

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    hidden: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
