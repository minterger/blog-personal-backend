const { Router } = require("express");
const { getPosts } = require("../controllers/index.controller");

const route = Router();

route.get("/posts", getPosts);

module.exports = route;
