const { Router } = require("express");
const {
  getPosts,
  createPosts,
  editPost,
  deletePost,
} = require("../controllers/index.controller");

const { checkUser, userIsAdmin } = require("../middlewares/checkUser");

const route = Router();

route.get("/posts", getPosts);

route.post("/posts", checkUser, userIsAdmin, createPosts);

route.put("/posts/:id", checkUser, userIsAdmin, editPost);

route.delete("/posts/:id", checkUser, userIsAdmin, deletePost);

module.exports = route;
