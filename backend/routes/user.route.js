const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { registerUser, loginUser, getUserProfile, logoutUser } = require("../controllers/user.controller.js");
const AuthMiddleware = require("../middlewares/auth.middlware.js");

router.post("/register", [
    body("fullName.firstName").isLength({min:3}).withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
], registerUser);


router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
], loginUser);

router.get("/profile",AuthMiddleware, getUserProfile);
router.get("/logout",AuthMiddleware, logoutUser);

module.exports = router;
