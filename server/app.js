var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv").config();
const connectDB = require("./db/index");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth-router");
const contactRouter = require("./routes/contact-router");
const userRouter = require("./routes/user-router");
const eventRouter = require("./routes/event-router");
const parkingspotRouter = require("./routes/parkingspot-router");
const bookingRouter = require("./routes/booking-router");

const { verifyToken, authorizeRoles } = require("./middlewares/authMiddleware");

const corsOptions = {
  origin: "http://localhost:5173", // specify the frontend's origin explicitly
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers)
};

var app = express();

// Middleware setup
app.use(express.json()); // JSON body parser
app.use(logger("dev")); // Logger for HTTP request
app.use(morgan("dev"));
app.options("*", cors(corsOptions)); // Handle OPTIONS request with the correct CORS options

// Apply CORS middleware with proper configuration once
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false })); // URL-encoded body parser
app.use(cookieParser()); // Cookie parser
app.use(express.static(path.join(__dirname, "public"))); // Static files (if needed)

app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/user", verifyToken, userRouter);
app.use("/", eventRouter); // Event-related routes
app.use("/", parkingspotRouter); // Parking spot routes
app.use("/", bookingRouter); // Booking routes

// MongoDB connection and server start
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed!!!", err);
  });

module.exports = app;
