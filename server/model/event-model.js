const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    venue: { type: String, required: true },
    parkingSpots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ParkingSpot",
      },
    ],
    // parkingSpots: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
