const Post = require("../models/Post");

module.exports = {
  async getPosts(req, res) {
    try {
      const posts = await Post.find().populate("Comment");
      res.json(posts);
    } catch (error) {
      res.json(error);
      console.error(error);
    }
  },
};
