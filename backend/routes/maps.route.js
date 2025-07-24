const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlware.js");
const {getCoordinates, getDistanceTime, getSuggestions} = require("../controllers/maps.controlles.js");
const {query} =require("express-validator");



router.get("/getCoordinates", 
    query("address").isLength({min:3}).withMessage("Address must be at least 3 characters long"),
    authMiddleware.authMiddleware, getCoordinates);

module.exports = router;

router.get("/getDistanceTime",
    query("origin").isString().isLength({min:3}).withMessage("Origin must be a string and at least 3 characters long"),
    query("destination").isString().isLength({min:3}).withMessage("Destination must be a string and at least 3 characters long"),
    authMiddleware.authMiddleware, getDistanceTime);


router.get("/getSuggestions",
    query("input").isLength({min:3}).withMessage("Address must be at least 3 characters long"),
    authMiddleware.authMiddleware, getSuggestions);
