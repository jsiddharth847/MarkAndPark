const express = require("express");
const router = express.Router();
const {
  bookParkingSpot,
  // cancelBooking,
  // getBookingsByEvent,
} = require("../Controllers/booking-controller");

// Book a parking spot
router.post("/:parkingSpotId/book", bookParkingSpot);
// router.post("/book", bookParkingSpot);

// Cancel a booking
// router.delete("/:id", cancelBooking);

// // Get all bookings for an event
// router.get("/:eventId", getBookingsByEvent);

module.exports = router;
