const express = require("express");
const router = express.Router();

const {body,query} = require("express-validator");
const {createRide, countFare} = require("../controllers/ride.controller.js");
const { authMiddleware } = require("../middlewares/auth.middlware.js");

router.post("/create",
    authMiddleware,
    body('pickup').isString().isLength({min:3,}).withMessage("Pickup must be at least 3 characters long"),
    body('dropoff').isString().isLength({min:3,}).withMessage("Dropoff must be at least 3 characters long"),
    body('vehicleType').isString().isLength({min:3,}).withMessage("VehicleType must be at least 3 characters long"),
    createRide
)

router.get("/fare",
    authMiddleware,
    query('pickup').isString().isLength({min:3,}).withMessage("Pickup must be at least 3 characters long"),
    query('dropoff').isString().isLength({min:3,}).withMessage("Dropoff must be at least 3 characters long"),
    countFare
)

module.exports = router;