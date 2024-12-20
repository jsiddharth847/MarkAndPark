var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv").config();
const connectDB = require("./db/index");
const mongoose = require("mongoose");
const morgan = require("morgan");
// const indexRouter = require("./routes/auth-router");

const authRouter = require("./routes/auth-router");
const contactRouter = require("./routes/contact-router");
const userRouter = require("./routes/user-router");
const eventRouter = require("./routes/event-router");
const parkingspotRouter = require("./routes/parkingspot-router");
// const errorMiddleware = require("./middlewares/errorMiddleware");

// Importing middlewares
//const { errorMiddleware } = require("./middlewares/errorMiddleware"); // Assuming you have a custom error middleware
const { verifyToken, authorizeRoles } = require("./middlewares/authMiddleware");

var app = express();

// Middleware setup
app.use(express.json()); // JSON body parser
app.use(logger("dev")); // Logger for HTTP request
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); // URL-encoded body parser
app.use(cookieParser()); // Cookie parser
app.use(express.static(path.join(__dirname, "public"))); // Static files (if needed)

app.use("/api/auth", authRouter); // All routes in indexRouter will now start with /api/auth
app.use("/api/user", verifyToken, userRouter);
app.use("/", eventRouter); // User-related routes, protected by JWT middleware
app.use("/", parkingspotRouter); // User-related handlers
// s
// Error handling middleware should be at the bottom, after routes
// app.use(errorMiddleware);

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
