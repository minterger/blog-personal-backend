const User = require("../models/User");
const generateJwt = require("../helpers/generateJWT");

const userWithoutPassword = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    admin: user.admin,
  };
};

module.exports = {
  getUser(req, res) {
    res.json({
      user: userWithoutPassword(req.user),
    });
  },

  async createUser(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Rellene todos los datos  " });
      }

      const existUser = await User.findOne({ email });

      if (existUser) {
        return res.status(400).json({ message: "Su Email ya existe" });
      }

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });

      const savedUser = await newUser.save();

      const token = generateJwt(savedUser);

      res.json({
        token,
        user: userWithoutPassword(savedUser),
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Rellene todos los campos" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.json({ message: "Email o Contraseña incorrecta" });
      }

      const checkedPassword = await user.checkPassword(password);

      console.log(checkedPassword);

      if (checkedPassword) {
        const token = generateJwt(user);

        return res.json({
          token,
          user: userWithoutPassword(user),
        });
      } else {
        return res.json({ message: "Email o Contraseña incorrecta" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
