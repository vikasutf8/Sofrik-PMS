const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { registerRider, getRiderProfile, logoutRider, loginRider } = require("../controllers/rider.controller");
const { riderAuthMiddleware } = require("../middlewares/auth.middlware");


router.post("/register", [
    body("fullname.firstname").isLength({min:3}).withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isLength({min:6}).withMessage("Plate must be at least 6 characters long"),
    body("vehicle.capacity").isLength({min:1}).withMessage("Capacity must be at least 1 characters long"),
    body("vehicle.vehicleType").isLength({min:1}).withMessage("Vehicle type must be at least 1 characters long"),
  
], registerRider);


router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
], loginRider);


router.get("/profile",riderAuthMiddleware, getRiderProfile);
router.get("/logout",riderAuthMiddleware, logoutRider);


module.exports = router;