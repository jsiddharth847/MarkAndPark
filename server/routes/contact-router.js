const express = require("express");
const router = express.Router();

// const { contactUsSchema } = require("../validator/validator");
// const { validate } = require("../middlewares/validatorMiddleware");
const contactController = require("../Controllers/contact-controller");

// adding route for contact page
router.route("/contact").post(contactController.contactUs);

module.exports = router;
