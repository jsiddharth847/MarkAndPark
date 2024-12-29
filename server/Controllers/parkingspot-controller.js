const Event = require("../model/event-model");
const chalk = require("chalk");
const ParkingSpot = require("../model/parkingspot-model");
// const addParkingSpot = async (req, res) => {
//   try {
//     const { spotLocation, price, quantity, event, spotNumber } = req.body;

//     // Validate required fields (quantity should be 1 for single spot)
//     if (!spotLocation || !price || !quantity || !event || !spotNumber) {
//       console.error(chalk.red("Missing required fields or invalid quantity"));
//       return res
//         .status(400)
//         .json({ msg: "All fields are required and quantity must be 1" });
//     }

//     // if (spotNumber <= 0 || spotNumber > 25) {
//     //   console.error(chalk.red("Invalid spot number"));
//     //   return res
//     //     .status(400)
//     //     .json({ msg: "Spot number must be between 1 and 25" });
//     // }

//     // Check if event exists
//     const eventExists = await Event.findById(event);
//     if (!eventExists) {
//       console.error(chalk.red("Event not found"));
//       return res.status(404).json({ msg: "Event not found" });
//     }

//     // Create a single parking spot
//     const parkingSpot = await ParkingSpot.create({
//       spotLocation,
//       price,
//       spotNumber,
//       event: event,
//     });

//     if (!parkingSpot) {
//       console.error(chalk.red("Error adding parking spot"));
//       return res.status(500).json({ msg: "Error adding parking spot" });
//     }

//     console.log(chalk.green("Parking spot added successfully"));
//     res
//       .status(201)
//       .json({ msg: "Parking spot added successfully", parkingSpot });
//   } catch (err) {
//     console.error(chalk.red("Error:", err.message));
//     res.status(500).json({ msg: "Internal server error" });
//   }
// };

const addParkingSpot = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { spotLocation, price, quantity, event } = req.body;

    // Check if any required field is missing
    if (!spotLocation || !price || !quantity || !event) {
      return res.status(400).json({
        message:
          "All fields (spotLocation, price, quantity, event) are required.",
      });
    }

    // Validate that price and quantity are positive numbers
    if (price <= 0 || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Price and quantity must be positive numbers." });
    }

    // Check if event exists (basic check)
    // (Assumes event is a valid ObjectId or reference. You can enhance this check based on your Event model's validation)
    const existingEvent = await Event.findById(event);
    if (!existingEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Create the parking spot object
    const newParkingSpot = new ParkingSpot({
      spotLocation,
      price,
      quantity,
      event,
    });

    // Save the parking spot (the 'pre' middleware will generate the spots)
    await newParkingSpot.save();

    // Return success response with the newly created parking spot data
    return res.status(201).json({
      message: "Parking spot created successfully",
      data: newParkingSpot,
    });
  } catch (error) {
    console.error("Error creating parking spot:", error);

    // Handle specific error types
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Invalid data provided.", error: error.message });
    }
    // Handle server error
    return res.status(500).json({
      message: "Server error while creating parking spot.",
      error: error.message,
    });
  }
};

const removeParkingSpot = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSpot = await ParkingSpot.findByIdAndDelete(id);
    if (!deletedSpot) {
      console.error(chalk.red("Parking spot not found"));
      return res.status(404).json({ msg: "Parking spot not found" });
    }
  } catch (err) {
    console.error(chalk.red("Error:", err.message));
    res.status(500).json({ msg: "Internal server error" });
  }
};

const editParkingSpot = async (req, res) => {
  const { id } = req.params;
  const { spotLocation, price, quantity } = req.body;

  try {
    const spotexist = await ParkingSpot.findById(id);

    if (!spotexist) {
      console.error(chalk.red("Parking spot not found"));
      return res.status(404).json({ msg: "Parking spot not found" });
    }

    if (spotLocation) {
      spotexist.spotLocation = spotLocation;
    }
    if (price && price > 0) {
      spotexist.price = price;
    }
    if (quantity && quantity > 0) {
      spotexist.quantity = quantity;
    }
    await spotexist.save();
    console.log(chalk.green("Parking spot updated successfully"));
    return res
      .status(200)
      .json({ msg: "Parking spot updated successfully", spotexist });
  } catch (err) {
    console.error(chalk.red("Error:", err.message));
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAvailableSpots = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      console.error(chalk.red("Event not found"));
      return res.status(404).json({ msg: "Event not found" });
    }
    const availableSpots = await ParkingSpot.find({
      event: eventId,
      availability: true,
      quantity: { $gt: 0 },
    });

    if (availableSpots.length === 0 || !availableSpots) {
      console.log(chalk.red("No available parking spots"));
      return res.status(404).json({ msg: "No available parking spots" });
    }
    console.log(chalk.green("Available parking spots", availableSpots));
    return res
      .status(200)
      .json({ msg: "Available parking spots", availableSpots });
  } catch (e) {
    console.error(chalk.red("Error:", e.message));
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  addParkingSpot,
  editParkingSpot,
  getAvailableSpots,
  removeParkingSpot,
};
