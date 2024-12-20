const Event = require("../model/event-model");
const chalk = require("chalk");
const ParkingSpot = require("../model/parkingspot-model");

const addParkingSpot = async (req, res) => {
  try {
    const { spotLocation, price, quantity, eventID } = req.body;

    // Validate required fields
    if (!spotLocation || !price || !quantity || !eventID) {
      console.error(chalk.red("Missing required fields"));
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (quantity <= 0) {
      console.error(chalk.red("Invalid quantity"));
      return res
        .status(400)
        .json({ msg: "Quantity must be a positive number" });
    }

    // Check if event exists
    const eventExists = await Event.findById(eventID);
    if (!eventExists) {
      console.error(chalk.red("Event not found"));
      return res.status(404).json({ msg: "Event not found" });
    }

    // Create new parking spot
    const parkingSpot = await ParkingSpot.create({
      spotLocation,
      price,
      quantity,
      event: eventID,
    });

    if (!parkingSpot) {
      console.error(chalk.red("Error adding parking spot"));
      return res.status(500).json({ msg: "Error adding parking spot" });
    }

    console.log(chalk.green("Parking spot added successfully"));
    res
      .status(201)
      .json({ msg: "Parking spot added successfully", parkingSpot });
  } catch (err) {
    console.error(chalk.red("Error:", err.message));
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  addParkingSpot,
};
