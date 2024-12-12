const bcrypt = require("bcrypt");
const User = require("../model/user-model");
const { generateToken } = require("../middlewares/authMiddleware");
const chalk = require("chalk");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the Authentication API");
  } catch (err) {
    console.log("Error in home route:", err);
    res.status(500).send("Server Error");
  }
};

const register = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, email, aadharNumber, password } = req.body;

    // Ensure all required fields are provided
    if (!name || !email || !aadharNumber || !password) {
      console.log(chalk.red("All fields are required"));
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists with the given email
    console.log("Checking if user exists with email:", email);
    const userExist = await User.findOne({ email });

    if (userExist) {
      console.log(chalk.red("User already exists with this email"));
      return res.status(400).json({ error: "User already exists" });
    }

    // Check if the user already exists with the given Aadhar number
    const aadharExist = await User.findOne({ aadharNumber });
    if (aadharExist) {
      console.log(chalk.red("Aadhar number already registered"));
      return res
        .status(400)
        .json({ error: "Aadhar number already registered" });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user document
    const user = await User.create({
      name,
      email,
      aadharNumber,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({
        error: "Failed to register user, please enter details properly.",
      });
    }

    // User registration successful
    console.log("User created:", user);

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        aadharNumber: user.aadharNumber,
      },
      token,
    });
  } catch (err) {
    console.log("Error during registration:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    console.log("JWT token generated: " + token);

    res.json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { home, register, login };
