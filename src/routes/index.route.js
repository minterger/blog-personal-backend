const { Router } = require("express");
const {
  getPosts,
  getOnePost,
  createPosts,
  editPost,
  deletePost,
  addComment,
} = require("../controllers/index.controller");

const { checkUser, userIsAdmin } = require("../middlewares/checkUser");

const route = Router();

route.get("/", getPosts);

route.get("/:id", getOnePost);

route.post("/", checkUser, userIsAdmin, createPosts);

route.put("/:id", checkUser, userIsAdmin, editPost);

route.delete("/:id", checkUser, userIsAdmin, deletePost);

route.post("/comment/:id", checkUser, addComment);

module.exports = route;
