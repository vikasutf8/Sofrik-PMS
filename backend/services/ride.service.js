const rideModel = require("../models/ride.model.js");
const {getDistanceTimeService} = require("./maps.service.js");
const {validationResult} = require("express-validator");
const crypto = require('crypto');
const { sendMessageToSocket } = require("../socket.js");

async function getFare(pickup, dropoff) {
    if(pickup === dropoff) {
        return 0;
    }
    if(!pickup || !dropoff) {
        throw new Error("Pickup and dropoff are required");
    }
    const distanceTime = await getDistanceTimeService(pickup, dropoff);
    
    // Extract numeric values from the strings
    const distance = parseFloat(distanceTime.distance.split(' ')[0]);
    const duration = parseFloat(distanceTime.duration.split(' ')[0]);
    
    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    }
    const perKmRate = {
        auto: 0.5,
        car: 1,
        motorcycle: 0.5
    }
    const perMinRate = {
        auto: 0.5,
        car: 1,
        motorcycle: 0.5
    }

    const fareCal = {
        auto: baseFare.auto + duration * perMinRate.auto + distance * perKmRate.auto,
        car: baseFare.car + duration * perMinRate.car + distance * perKmRate.car,
        motorcycle: baseFare.motorcycle + duration * perMinRate.motorcycle + distance * perKmRate.motorcycle
    }
    return fareCal;
}


async function getOTP(num   ) {
    function genearateOTP(num) {
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
        return otp;
    }
    return genearateOTP(num);
}

const createRideService = async ({
  user, pickup, dropoff, vehicleType
}) => {
    if(!user || !pickup || !dropoff || !vehicleType) {
        return {message: "Please provide all the required fields"};
    }

    const fare = await getFare(pickup, dropoff);
    const ride = await rideModel.create({
        user,
        pickup,
        dropoff,
        fare: Number(fare[vehicleType].toFixed(2)),
        vehicleType,
        otp : await getOTP(6)
    });
    return ride;
}


const rideService =async({rideId,rider})=>{
    if(!rideId) {
        throw new Error("RideId is required");
    }

    await rideModel.updateOne({_id :rideId},{status:"accepted",rider :rider})  //this having an issue
    const ride = await rideModel.findOne({_id :rideId}).populate("user").populate("rider").select("+otp");

    return ride;
}

const startRideService = async ({rideId,otp,rider}) => {
    if(!rideId || !otp) {
        throw new Error("RideId and otp are required");
    }
   
    const ride = await rideModel.findOne({_id :rideId}).populate("user").populate("rider").select("+otp");

    if(!ride){
        throw new Error("Ride not found");
    }
    if(ride.status !== "accepted"){
        throw new Error("Ride is not accepted");
    }
    if(ride.otp !== otp){
        throw new Error("Invalid OTP");
    }
    await rideModel.findOneAndUpdate({_id :rideId},{status:"ongoing"})  //this having an issue

    sendMessageToSocket(ride.user.socketId,{
      event:"rideStarted",  
      data: ride
    })

    return ride;
}

module.exports ={
    getFare,
    createRideService,
    rideService,
    startRideService
}