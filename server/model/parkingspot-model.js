const parkingSpotSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ParkingSpot", parkingSpotSchema);
