const {createRideService} = require("../services/ride.service.js");

const {validationResult} = require("express-validator");
const rideModel = require("../models/ride.model.js");


const createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, dropoff, vehicleType} = req.body;
  try {
    const ride = await createRideService({user:req.user._id, pickup, dropoff, vehicleType});
    res.status(201).json({ride});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = {
  createRide,
};