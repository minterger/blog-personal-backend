require("dotenv").config();

const app = require("./app");

const port = process.env.PORT || 444;

app.listen(port, () => {
  console.log("Server is listening", port);
});
