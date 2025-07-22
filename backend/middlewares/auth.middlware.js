
const usermodel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const riderModel = require("../models/rider.model.js");
const blacklistModel = require("../models/blacklist.model.js");


module.exports.authMiddleware = async (req, res, next) => {

    const token =  req.cookies.token || req.headers.authorization.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }

    const blacklist = await blacklistModel.findOne({token: token});
    if(blacklist) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded._id);
        if(!user) {
            return res.status(401).json({message: "Unauthorized"});
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
}

module.exports.riderAuthMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split('')[1] || req.cookies.token;
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }

    const blacklist = await blacklistModel.findOne({token: token});
    if(blacklist) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const rider = await riderModel.findById(decoded._id);
        if(!rider) {
            return res.status(401).json({message: "Unauthorized"});
        }
        req.rider = rider;
        return next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }


};