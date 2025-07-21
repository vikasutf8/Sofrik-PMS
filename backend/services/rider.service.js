 
 const riderModel = require("../models/rider.model.js");

 module.exports.createRider = async ({
    firstName, lastName, email, password,color, plate, capacity, vehicleType
}) => {
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        return {message: "Please provide all the required fields"};
    }

    const rider= await riderModel.create({
        fullname:{
            firstname: firstName, lastname: lastName
        },
        email,
        password,
        vehicle:{
            color, plate, capacity, vehicleType
        }

    });
    return rider;
 }