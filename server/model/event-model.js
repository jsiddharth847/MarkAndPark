const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    parkingSpots: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpot" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
