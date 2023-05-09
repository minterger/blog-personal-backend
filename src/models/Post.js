const { model, Schema } = require("mongoose");
const Comment = require("./Comment");

const postSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    labels: [{ type: String }],
    body: { type: String, required: true },
    html: { type: String, required: true },
    url: { type: String, required: true, unique: true },

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    hidden: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

postSchema.pre("deleteOne", async function (next) {
  console.log("deleteone");
  try {
    await this.model("Comment").deleteMany();
    next();
  } catch (error) {
    next(error);
  }
});

postSchema.pre("deleteMany", async function (next) {
  console.log("deletemany");
  try {
    await this.model("Comment").deleteMany();
    next();
  } catch (error) {
    next(error);
  }
});

postSchema.pre("remove", async function (next) {
  console.log("remove");
  try {
    await this.model("Comment").deleteMany();
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model("Post", postSchema);
