const Contact = require("../model/contact-model");

// const contactUs = async (req, res) => {
//   try {
//     const { FirstName, LastName, email, Message } = req.body;

//     if (!FirstName || !LastName || !email || !Message) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     const contact = await Contact.create({
//       FirstName,
//       LastName,
//       email,
//       Message,
//     });
//     contact.save();

//     if (!contact) {
//       return res.status(400).json({
//         error: "Failed to register user, please enter details properly.",
//       });
//     }
//     console.log(
//       "Form Submitted Successfully!!!!, our team will contact you shortly.... "
//     );
//     return res.status(200).json({
//       message:
//         "Form Submitted Successfully!!!!, our team will contact you shortly....",
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
const contactUs = async (req, res) => {
  try {
    const { Firstname, Lastname, email, Message } = req.body; // Update field names here

    if (!Firstname || !Lastname || !email || !Message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contact = await Contact.create({
      Firstname, // Updated field names here
      Lastname, // Updated field names here
      email,
      Message,
    });
    // contact.save();

    if (!contact) {
      return res.status(400).json({
        error: "Failed to register user, please enter details properly.",
      });
    }
    console.log(
      "Form Submitted Successfully!!!!, our team will contact you shortly.... "
    );
    return res.status(200).json({
      message:
        "Form Submitted Successfully!!!!, our team will contact you shortly....",
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = { contactUs };
