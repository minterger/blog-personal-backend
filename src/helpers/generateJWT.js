const jwt = require("jsonwebtoken");

module.exports = (user) => {
  const { id, admin, firstname, lastname, email } = user;
  return jwt.sign(
    { id, admin, firstname, lastname, email },
    process.env.TOKEN_SECRET,
    { expiresIn: "2d" }
  );
};
