
const userModel = require("../models/user.model.js");


module.exports.createUser = async ({firstname, lastname, email, password}) => {

    if(!firstname || !email || !password) {
        return {message: "Please provide all the required fields"};
    }
    const user= await userModel.create({
        fullname:{
            firstname, lastname
        },
        email,
        password,
    });
    return user;

}

