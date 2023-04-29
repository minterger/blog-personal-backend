const User = require("../models/User");
const generateJwt = require("../helpers/generateJWT");

module.exports = {
  getUser(req, res) {
    res.json(req.user);
  },

  async createUser(req, res) {
    const { firstName, lastName, email, password } = req.user;

    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (re.test(password)) {
      res
        .json({ message: "Su contraseña no es lo suficientemente segura" })
        .status(400);
    }

    try {
      const existUser = await User.findOne({ email });

      if (existUser) {
        res.json({ message: "Su Email ya existe" }).status(400);
      }

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });

      const savedUser = await newUser.save();

      delete savedUser.password;

      const token = generateJwt(savedUser);

      res.json({ token, user: savedUser });
    } catch (error) {
      res.send(error).status(500);
    }
  },

  async loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({ message: "Rellene todos los campos" }).status(400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.json({ message: "Email o Contraseña incorrecta" });
    }

    const checkedPassword = user.checkPassword(password);

    if (checkedPassword) {
      delete user.password;

      const token = generateJwt(savedUser);

      res.json({ token, user });
    } else {
      res.json({ message: "Email o Contraseña incorrecta" });
    }
  },
};
