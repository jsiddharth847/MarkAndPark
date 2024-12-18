const User = require("../model/user-model");
const Event = require("../model/event-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/authMiddleware");
const chalk = require("chalk");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).populate("parkingSpots");

    if (!events) {
      console.log(chalk.red("No events found"));
      return res.status(404).json({ error: "No events found" });
    }

    return res.status(200).json({ events: events });
  } catch (err) {
    console.log(chalk.red("Error in getting all events:"), err);
    res.status(500).json({ error: "Server Error" });
  }
};

// const createEvent = async (req, res) => {
//   try {
//     const { eventName, eventDate, venue, parkingSpots } = req.body;
//     if (!eventName || !eventDate || !venue || !parkingSpots) {
//       console.log(chalk.red("Missing required fields"));
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const event = await Event.create({
//       eventName,
//       eventDate,
//       venue,
//       parkingSpots,
//     });

//     console.log(chalk.green(event));
//     if (!event) {
//       console.log(chalk.red("Failed to create event"));
//       return res.status(400).json({ error: "Failed to create event" });
//     }
//     console.log(chalk.green("Event created successfully:", event));
//     return res.status(201).json({ msg: event });
//   } catch (err) {
//     console.log(chalk.red("Error in creating event:"), err);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

const createEvent = async (req, res) => {
  try {
    const { eventName, eventDate, venue, parkingSpots } = req.body;

    // Validate required fields
    if (!eventName || !eventDate || !venue || !parkingSpots) {
      console.log("Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate eventDate
    const parsedDate = new Date(eventDate);
    if (isNaN(parsedDate.getTime()) || parsedDate <= new Date()) {
      console.log("Invalid or past event date");
      return res
        .status(400)
        .json({ error: "Event date must be a valid future date" });
    }

    // Validate parkingSpots
    if (typeof parkingSpots !== "number" || parkingSpots <= 0) {
      console.log("Invalid parking spots value");
      return res
        .status(400)
        .json({ error: "Parking spots must be a positive number" });
    }

    // Create the event
    const event = await Event.create({
      eventName,
      eventDate: parsedDate,
      venue,
      parkingSpots,
    });

    if (!event) {
      console.log("Failed to create event");
      return res.status(500).json({ error: "Failed to create event" });
    }

    console.log("Event created successfully:", event);
    return res.status(201).json({ msg: "Event created successfully", event });
  } catch (err) {
    console.log("Error in creating event:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getAllEvents, createEvent };