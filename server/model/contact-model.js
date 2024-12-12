const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
  },

  Lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  Message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Contact = new mongoose.model("ContactUsForm", contactSchema);

module.exports = Contact;
