const User = require("../model/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/authMiddleware");
const chalk = require("chalk");

// To get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      console.log(chalk.red("User not found"));
      return res.status(404).json({ message: chalk.red("User not found") });
    }

    res.json(chalk.green(user));
    console.log(chalk.green("user"));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res
      .status(200)
      .json({ message: "User Profile Updated Successfully!!!!", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //checking if old password matches

    const isMatch = await bcrypt.compare(oldPassword, newPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ message: "Password changed successfully!!!!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(chalk.red(`user deleted successfully!!!! ${user}`));
    res.json({ message: "User Account deleted successfully!!!!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  changePassword,
};
