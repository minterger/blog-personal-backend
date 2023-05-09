const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  async getPosts(req, res) {
    try {
      const options = {
        page: 1,
        limit: 10,
        sort: "asca",
        populate: {
          path: "author",
          select: "firstName lastName email avatar",
        },
      };

      const posts = await Post.paginate({}, options);

      res.json(posts);
    } catch (error) {
      res.json(error);
      console.error(error);
    }
  },

  async getOnePost(req, res) {
    try {
      const id = req.params.id;
      const post = await Post.findById(id)
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select: "firstName lastName email avatar",
          },
        })
        .populate("author", { firstName: 1, lastName: 1 });

      if (!post) {
        return res.status(404).json({ message: "Post no encontrado" });
      }

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async createPosts(req, res) {
    try {
      const { title, body, url, imgUrl, hidden } = req.body;

      const newPost = new Post({
        author: req.user,
        title: title.trim(),
        body: body.trim(),
        imgUrl: imgUrl.trim(),
        url: url.trim().replace(/\s+/gm, "-"),
        hidden: !!hidden,
      });

      const savedPost = await newPost.save();

      res.json({
        post: await savedPost.populate("author", {
          firstName: 1,
          lastName: 1,
          avatar: 1,
          email: 1,
        }),
        message: "Post creado con exito",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async editPost(req, res) {
    try {
      const { title, body, url, imgUrl, hidden } = req.body;
      const id = req.params.id;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({
          message: "Post no encontrado",
        });
      }

      post.title = (title || post.title).trim();
      post.body = (body || post.body).trim();
      post.hidden = hidden === undefined ? post.hidden : hidden;
      post.imgUrl = (imgUrl || post.imgUrl).trim();
      post.url = (url || post.url).trim().replace(/\s+/gm, "-");

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
        return res.status(404).json({
          message: "Post no encontrado",
        });
      }

      await post.deleteOne();

      await Comment.deleteMany({ _id: { $in: post.comments } });

      await res.json({
        message: "Post eliminado",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async addComment(req, res) {
    try {
      const postId = req.params.id;
      const { body } = req.body;

      const post = await Post.findById(postId)
        .populate({
          path: "comments",
          populate: { path: "author", select: "firstName lastName" },
        })
        .populate("author", { firstName: 1, lastName: 1, avatar: 1, email: 1 });

      const comment = new Comment({ author: req.user, body });

      await (
        await comment.save()
      ).populate("author", { firstName: 1, lastName: 1, avatar: 1, email: 1 });

      post.comments.push(comment);

      await post.save();

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
