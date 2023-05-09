const express = require("express");
const cors = require("cors");
const indexRoute = require("./routes/index.route");
const userRoute = require("./routes/user.route");
const morgan = require("morgan");

require("./database");

const app = express();

const origin = process.env.NODE_ENV === "dev" ? "*" : process.env.frontendUrl;

app.use(cors({ origin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/posts", indexRoute);

app.use("/user", userRoute);

module.exports = app;
