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

  async createPosts(req, res) {
    try {
      const { title, body, url, hidden } = req.body;
      const author = req.user.firstName + " " + req.user.lastName;

      const newPost = new Post({
        author,
        title,
        body,
        url,
        hidden,
      });

      const savedPost = await newPost.save();

      res.json({
        post: savedPost,
        message: "Post creado con exito",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async editPost(req, res) {
    try {
      const { title, body, url, hidden } = req.body;
      const id = req.params.id;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(401).json({
          message: "Post no encontrado",
        });
      }

      post.title = title;
      post.body = body;
      post.hidden = hidden;
      post.url = url;

      const editedPost = await post.save();

      res.json({
        post: editedPost,
        message: "Post creado con exito",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async deletePost(req, res) {
    try {
      const id = req.params.id;
      const post = await Post.findById(id);

      if (!post) {
        return res.status(401).json({
          message: "Post no encontrado",
        });
      }

      await Post.deleteOne({ id }).populate("comments");

      res.json({
        message: "Post eliminado",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
