const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const md5 = require("md5");

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String },
  admin: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    user.avatar = md5(user.email);

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.checkPassword = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

module.exports = model("User", userSchema);
