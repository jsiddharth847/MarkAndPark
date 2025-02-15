// const nodemailer = require("nodemailer");

// const otpStore = {}; // Object to store OTPs with expiration time

// const generateOTP = () => {
//   // Generate a 6-digit OTP
//   return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
// };

// // Send OTP to email
// const sendOTPEmail = async (email, otp) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "jsiddharth847@gmail.com", // Your email
//       pass: "igrd xnyf kszj ecbb", // Your email password or app password
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP code is: ${otp}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`OTP sent to ${email}`);
//   } catch (err) {
//     console.error("Error sending OTP:", err);
//     throw new Error("Failed to send OTP");
//   }
// };

// // Store OTP with expiration (e.g., 5 minutes expiry)
// const storeOTP = (email, otp) => {
//   const expiryTime = Date.now() + 10 * 60 * 1000; // 5 minutes expiration
//   otpStore[email] = { otp, expiryTime };
//   console.log(otpStore); // Store OTP and expiration time
// };

// // Verify OTP (check if it exists and is not expired)
// // Verify OTP (check if it exists and is not expired)
// const verifyOTP = (email, enteredOTP) => {
//   const storedOTP = otpStore[email]; // Fetch the OTP for the email

//   if (!storedOTP) {
//     console.log(`No OTP found for email: ${email}`);
//     return false; // No OTP found for this email
//   }

//   console.log("Current time:", Date.now());
//   console.log("OTP expiration time:", storedOTP.expiryTime);

//   // Check if OTP has expired
//   if (Date.now() > storedOTP.expiryTime) {
//     delete otpStore[email]; // Remove expired OTP
//     console.log(`OTP for ${email} has expired`);
//     return false; // OTP expired
//   }

//   // Check if entered OTP matches the stored OTP
//   const isValid = storedOTP.otp === enteredOTP;
//   if (!isValid) {
//     console.log(
//       `Entered OTP (${enteredOTP}) does not match stored OTP (${storedOTP.otp})`
//     );
//   }

//   return isValid;
// };

// module.exports = { generateOTP, sendOTPEmail, storeOTP, verifyOTP };
const nodemailer = require("nodemailer");

const otpStore = {}; // Object to store OTPs with expiration time

const generateOTP = () => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Send OTP to email
const sendOTPEmail = async (email, otp) => {
  // Initialize the transporter object inside the function
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jsiddharth847@gmail.com", // Your email
      pass: "igrd xnyf kszj ecbb", // Your email password or app password
    },
  });

  const mailOptions = {
    from: "jsiddharth847@gmail.com", // Sender's email
    to: email, // Receiver's email
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    // Send the email using transporter
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (err) {
    console.error("Error sending OTP:", err);
    throw new Error("Failed to send OTP");
  }
};

// Store OTP with expiration (e.g., 5 minutes expiry)
const storeOTP = (email, otp) => {
  const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
  otpStore[email] = { otp, expiryTime };
  console.log(otpStore); // Store OTP and expiration time
};

// Verify OTP (check if it exists and is not expired)
const verifyOTP = (email, enteredOTP) => {
  const storeOTP = otpStore[email];

  if (!storeOTP) {
    return false; // No OTP found
  }

  // Check if OTP has expired
  if (Date.now() > storeOTP.expiryTime) {
    delete otpStore[email]; // Remove expired OTP
    return false; // OTP expired
  }

  // Check if entered OTP matches
  return storeOTP.otp === enteredOTP;
};

module.exports = { generateOTP, sendOTPEmail, storeOTP, verifyOTP };
