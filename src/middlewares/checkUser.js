const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async checkUser(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) res.sendStatus(401);

    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);

      req.user = await User.findById(user.id);

      next();
    } catch (error) {
      res.sendStatus(403);
    }
  },

  userIsAdmin(req, res, next) {
    const user = req.user;

    if (user.admin == true) {
      next();
    } else {
      res.status(403).send("Necesitas ser administrador");
    }
  },
};
