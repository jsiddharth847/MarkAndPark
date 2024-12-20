const express = require("express");
const router = express.Router();

const eventController = require("../Controllers/event-controller");

router.route("/getallevents").get(eventController.getAllEvents);
router.route("/createEvent").post(eventController.createEvent);
router.route("/updateevent").put(eventController.updateEvent);

module.exports = router;
