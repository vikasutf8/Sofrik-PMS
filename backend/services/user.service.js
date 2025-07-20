
const userModel = require("../models/user.model.js");


module.exports.createUser = async ({firstName, lastName, email, password}) => {

    if(!firstName || !email || !password) {
        return {message: "Please provide all the required fields"};
    }
    const user= await userModel.create({firstName, lastName, email, password});
    return user;

}

