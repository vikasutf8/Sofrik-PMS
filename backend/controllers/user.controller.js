const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");

const {validationResult} = require("express-validator");

const registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body);

    const {fullname, email, password} = req.body;
    const hashPassword = await userService.hashPassword(password);

    const user = await userService.createUser({firstName: fullname.firstName, lastName: fullname.lastName, email, password: hashPassword});

    const token = user.generateAuthToken();

    res.status(201).json({user, token});
}


const loginUser = async (req, res,next) => {
     const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select("+password");
    if(!user) {
        return res.status(400).json({message: "User not Exist ! Please register first"});
    }

    const isPasswordValid = await userService.comparePassword(password, user.password);
    if(!isPasswordValid) {
        return res.status(400).json({message: "Wrong password!!!"});
    }

    const token = user.generateAuthToken();

    res.status(200).json({token,user});

}

const getUserProfile = async (req, res,next) => {
    
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
}