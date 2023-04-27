const express = require("express");
const cors = require("cors");
const indexRoute = require("./routes/index.route");

const app = express();

const origin = process.env.NODE_ENV === "dev" ? "*" : "";

app.use(cors(origin));
app.set(express.json());
app.set(express.urlencoded({ extended: true }));

app.use(indexRoute);

module.exports = app;
