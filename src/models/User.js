const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 10;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  admin: { type: Boolean, default: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async (next) => {
  try {
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.checkPassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
