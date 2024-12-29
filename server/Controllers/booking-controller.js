const ParkingSpot = require("../model/parkingspot-model");
const Booking = require("../model/booking-model");
const chalk = require("chalk");

const bookParkingSpot = async (req, res) => {
  try {
    // Log the incoming request body to verify data
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    const { parkingSpotId } = req.params;
    // Destructure the required fields from the body
    const { userId, spotNumber } = req.body;

    if (!parkingSpotId || !userId || !spotNumber) {
      console.log(chalk.red("Missing required fields in request body"));
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch the parking spot by ID
    const parkingSpot = await ParkingSpot.findById(parkingSpotId);
    if (!parkingSpot) {
      console.log(chalk.red(`Parking spot with ID ${parkingSpotId} not found`));
      return res.status(404).json({ error: "Parking spot not found" });
    }

    // Find the specific spot by its number
    const spot = parkingSpot.spots.find((spot) => spot.number === spotNumber);
    if (!spot) {
      console.log(
        chalk.red(`Spot number ${spotNumber} not found in parking spot`)
      );
      return res.status(404).json({ error: "Spot number not found" });
    }

    // Check if the spot is already booked
    if (spot.isBooked) {
      console.log(chalk.red(`Spot number ${spotNumber} is already booked`));
      return res.status(400).json({ error: "Spot is already booked" });
    }

    // Mark the spot as booked
    spot.isBooked = true;
    await parkingSpot.save();

    // Create a booking record
    const newBooking = await Booking.create({
      userId,
      parkingSpotId,
      spotNumber,
      price: parkingSpot.price,
    });

    console.log(chalk.green("Parking spot booked successfully"));
    res.status(201).json({
      message: "Spot booked successfully",
      bookingDetails: {
        bookingId: newBooking._id,
        spotNumber: newBooking.spotNumber,
        userId: newBooking.userId,
        price: newBooking.price,
        bookingTime: newBooking.createdAt,
      },
    });
  } catch (error) {
    console.error(chalk.red("Error during booking:", error));
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { bookParkingSpot };
