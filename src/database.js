const mongoose = require("mongoose");

const connectUri = process.env.MONGO_URI;

mongoose
  .connect(connectUri)
  .then(() => {
    console.log("database is connected");
  })
  .catch((e) => {
    console.error(e);
  });
