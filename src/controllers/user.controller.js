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

const validateEmail = (email) => {
  return String(email).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

module.exports = {
  getUser(req, res) {
    const token = generateJwt(req.user);

    res.json({
      token,
      user: userWithoutPassword(req.user),
    });
  },

  async createUser(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Rellene todos los datos  " });
      }

      let emailLowerCase = email.toLowerCase();

      if (!validateEmail(emailLowerCase)) {
        return res.status(400).json({ message: "Ingrese un email valido" });
      }

      const existUser = await User.findOne({ email: emailLowerCase });

      if (existUser) {
        return res.status(400).json({ message: "Su Email ya existe" });
      }

      const newUser = new User({
        firstName,
        lastName,
        email: emailLowerCase,
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

      let emailLowerCase = email.toLowerCase();

      const user = await User.findOne({ email: emailLowerCase });

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
