const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who booked the spot
  parkingSpotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingSpot",
    required: true,
  }, // The parking spot being booked
  spotNumber: { type: String, required: true }, // Spot number (e.g., A1)
  price: { type: Number, required: true }, // Price for booking the spot
  bookingTime: { type: Date, default: Date.now }, // The time the booking was made
  status: {
    type: String,
    enum: ["confirmed", "pending", "canceled"],
    default: "confirmed",
  }, // Booking status
});

module.exports = mongoose.model("Booking", bookingSchema);
