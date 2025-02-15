// const express = require("express");
// const router = express.Router();
// const {
//   bookParkingSpot,
//   getUserBookings,
//   // cancelBooking,
// } = require("../Controllers/booking-controller");
// const {
//   verifyToken,
//   authorizeRoles,
// } = require("../middlewares/authMiddleware");

// // Book a parking spot
// // router.post("/:parkingSpotId/book", verifyToken, bookParkingSpot);
// router.post("/:parkingSpotId/book", verifyToken, bookParkingSpot);

// // Get user bookings
// router.get("/:userId/bookings", getUserBookings);

// // Cancel a booking
// // router.delete("/:id", cancelBooking); // Updated to use DELETE method for cancellation

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  bookParkingSpot,
  getUserBookings,
  cancelBooking,
} = require("../Controllers/booking-controller");
const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// Book a parking spot
router.post("/:eventId/book", verifyToken, bookParkingSpot);

// Get user bookings
router.get("/:userId/bookings", getUserBookings);

// Cancel a booking
router.delete("/:bookingId/cancel", verifyToken, cancelBooking);
module.exports = router;
