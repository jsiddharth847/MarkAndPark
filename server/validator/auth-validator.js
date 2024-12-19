const { z } = require("zod");
const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be of 3 chars" })
    .max(255, { message: "Name must be not more than 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Email must be of 3 chars" })
    .max(255, { message: "Email must be not more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be of 10 chars" })
    .max(13, {
      message:
        "Phone must be not more than 13 characters including country code",
    }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be of 8 chars" })
    .max(255, { message: "Password must be not more than 255 characters" }),

  aadharNumber: z
    .string({ required_error: "Aadhar number is required" })
    .trim()
    .length(12, { message: "Aadhar number must be exactly 12 digits" }),
});
module.exports = signupSchema;
