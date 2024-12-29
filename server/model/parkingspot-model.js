const mongoose = require("mongoose");
const generateSpots = require("../middlewares/generateSpotsMiddleware");

const parkingSpotSchema = new mongoose.Schema({
  spotLocation: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  quantity: { type: Number, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  spots: [
    {
      number: { type: String, required: true }, // Spot number
      isBooked: { type: Boolean, default: false }, // Booking status
    },
  ],
});
parkingSpotSchema.pre("save", generateSpots);
module.exports = mongoose.model("ParkingSpot", parkingSpotSchema);
