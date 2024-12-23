const express = require("express");
const router = express.Router();

const parkingSpotController = require("../Controllers/parkingspot-controller");

// Routes for Parking Spot Management
router.route("/addparking").post(parkingSpotController.addParkingSpot); // Add a new parking spot

router.route("/edit/:id").put(parkingSpotController.editParkingSpot); // Edit parking spot details

router.route("/remove/:id").delete(parkingSpotController.removeParkingSpot); // Remove a parking spot

router
  .route("/available/:eventId")
  .get(parkingSpotController.getAvailableSpots); // Get available spots for an event

module.exports = router;
