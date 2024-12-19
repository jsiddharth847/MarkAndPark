const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema({
  spotLocation: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true }, // Available or occupied
  quantity: { type: Number, required: true }, // Number of spots available
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
});

module.exports = mongoose.model("ParkingSpot", parkingSpotSchema);
