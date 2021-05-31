const bcrypt = require("bcryptjs");

const authController = {};

const User = require("../models/User");

authController.login = async ({ user }, res) => {
  console.log("Login!");
  if (user) {
    console.log("User Found");
    user = await User.findByIdAndUpdate(
      user._id,
      { avatarUrl: user.avatarUrl },
      { new: true },
    );
  } else {
    console.log("Creating new User!");
    let newPassword = "" + Math.floor(Math.random() * 100000000);
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);

    user = await User.create({
      name: user.name,
      email: user.email,
      password: newPassword,
      avatarUrl: user.avatarUrl,
    });
  }
  const accessToken = await user.generateToken();
  res.send({ user, accessToken });
};

module.exports = authController;
