
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const riderModel = require("../models/rider.model.js");
const blacklistModel = require("../models/blacklist.model.js");


module.exports.authMiddleware = async (req, res, next) => {
    try {
        // Get token from cookies or headers
        let token = req.cookies.token;
        
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Check if token is blacklisted
        const blacklist = await blacklistModel.findOne({ token: token });
        if (blacklist) {
            return res.status(401).json({ message: "Token is blacklisted" });
        }

        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by decoded ID
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach user to request object
        req.user = user;
        next();
        
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        
        return res.status(401).json({ message: "Authentication failed" });
    }
}



module.exports.riderAuthMiddleware = async (req, res, next) => {

    let token = req.cookies.token;
    if(!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(" ")[1];
        }
    }

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
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
        console.error("Auth middleware error:", error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        
        return res.status(401).json({ message: "Authentication failed" });
    }


};