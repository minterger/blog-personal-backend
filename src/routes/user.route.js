const { Router } = require("express");
const {
  getUser,
  createUser,
  loginUser,
} = require("../controllers/user.controller");
const { checkUser } = require("../middlewares/checkUser");

const route = Router();

route.get("/", checkUser, getUser);

route.post("/create", createUser);

route.post("/login", loginUser);

module.exports = route;
