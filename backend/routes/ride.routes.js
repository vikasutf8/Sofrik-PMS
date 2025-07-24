const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlware.js");
const {body} = require("express-validator");

router.post("/create",
    body('userId').isString().isLength({min:24,max:24}).withMessage("UserId must be at least 3 characters long"),
    body('pickup').isString().isLength({min:3,}).withMessage("Pickup must be at least 3 characters long"),
    body('dropoff').isString().isLength({min:3,}).withMessage("Dropoff must be at least 3 characters long"),

)


module.exports = router;