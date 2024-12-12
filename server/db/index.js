const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connecting to MongoDB using the connection URI from the environment variable
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB", e);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
