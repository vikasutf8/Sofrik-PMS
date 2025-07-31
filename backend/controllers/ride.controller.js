const {createRideService, getFare, rideService, endRideService} = require("../services/ride.service.js");

const {validationResult} = require("express-validator");
const rideModel = require("../models/ride.model.js");
const { getRiderInTheRadiusService, getAddressCoordinates } = require("../services/maps.service.js");
const { sendMessageToSocket } = require("../socket.js");


const createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, dropoff, vehicleType} = req.body;
  try {
    const ride = await createRideService({user:req.user._id, pickup, dropoff, vehicleType});
    res.status(201).json({ride});
//user created at ride... How to find no of rider preset at that location
    const pickupCordinates =await getAddressCoordinates(pickup)

//  1. getting user location in ltd and lng

// and from backend saved cordinate of riders in db ??find all riders that under in 5km radius
    const riderRadius = await getRiderInTheRadiusService({
      lat: pickupCordinates.lat,
      lng: pickupCordinates.lng,
      radius: 5
    });

    ride.otp="";
    console.log(riderRadius,"riderRadius");

// to Send full data of user - populate
const rideWithUser =await rideModel.findOne({_id :ride._id}).populate("user")


// after all rider data stored in riderRadius...and now a popup all rider present in radius with newRider event
    riderRadius.map( rider=>{
        sendMessageToSocket(rider.socketId,{
          event:"newRide",
          data: rideWithUser
        })
    })

    console.log(riderRadius.map( rider=>{
        sendMessageToSocket(rider.socketId,{
          event:"newRide",
          data: rideWithUser
        })
    }) ,"riderRadius.map( rider=>{")

  } catch (error) {
    console.log(error)
    res.status(500).json({error: error.message});
  }
};


const countFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, dropoff} = req.query;
  try {
    const fare = await getFare(pickup, dropoff);
    res.status(200).json({fare});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};


const comfirmRide =async (req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService({rideId,rider :req.rider});

    sendMessageToSocket(ride.user.socketId,{
      event:"rideConfirmed",
      data: ride
    })

    res.status(200).json({ride});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

const startRide=async (req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId,otp } = req.query;
  try {
    const ride = await rideService({rideId,otp,rider :req.rider});

    if(ride.otp !== otp){
      return res.status(400).json({error:"Invalid OTP"});
    }

    sendMessageToSocket(ride.user.socketId,{
      event:"rideStarted",  
      data: ride
    })

    res.status(200).json({ride});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}



const  endRide =async (req, res, next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await endRideService({rideId,rider :req.rider});

    sendMessageToSocket(ride.user.socketId,{
      event:"rideEnded",
      data: ride
    }) 

    res.status(200).json({ride});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}
module.exports = {
  createRide,
  countFare,
  comfirmRide,
  startRide,
  endRide
};