const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    profilepicture: {
      type: String,
      trim: true,
      // default:
      //   "http://localhost:3000/static/media/card4.a99ca89ff783e569b99a.avif",
    },
    venue: { type: String, required: true },
    //   parkingSpots: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "ParkingSpot",
    //     },
    //   ],
    parkingSpots: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
