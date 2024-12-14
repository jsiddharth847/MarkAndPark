const express = require("express");
const router = express.Router();
// const { home } = require('../Controllers/auth-controller');
// Destructure 'home' from the exported object
const signupSchema = require("../validator/auth-validator");
// const loginSchema = require("../validator/validator");
const validate = require("../middlewares/validate-middleware");

const authController = require("../Controllers/auth-controller");

router.route("/").get(authController.home);
// router.route("/register").post(authController.register);
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(authController.login);

// router.route("/register").get(register)
module.exports = router;
