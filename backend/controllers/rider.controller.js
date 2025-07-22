const riderModel = require("../models/rider.model.js");
const riderService = require("../services/rider.service.js");
const { validationResult } = require("express-validator");

const registerRider = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isRiderExist = await riderModel.findOne({ email });
  if (isRiderExist) {
    return res
      .status(400)
      .json({ message: "Rider already Exist with this email" });
  }

  const hashPassword = await riderModel.hashPassword(password);

  const rider = await riderService.createRider({
    firstName: fullname.firstname,
    lastName: fullname.lastname,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = rider.generateAuthToken();

  return res.status(201).json({ token, rider });
};

const loginRider = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const rider = await riderModel.findOne({ email }).select("+password");
  if (!rider) {
    return res
      .status(400)
      .json({ message: "Rider not Exist ! Please register first" });
  }

  const isPasswordValid = await rider.comparePassword(
    password,
    rider.password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Wrong password!!!" });
  }

  const token = rider.generateAuthToken();

  res.cookie("token", token, { maxAge: 60 * 60 * 24 * 30, httpOnly: true });

  return res.status(200).json({ token, rider });
};

const getRiderProfile = async (req, res, next) => {
  return res.status(200).json({ rider: req.rider });
};

const logoutRider = async (req, res, next) => {
  const token = req.headers.authorization.split("")[1] || req.cookies.token;
  await riderModel.create({ token });
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout success" });
};

module.exports = {
  registerRider,
  loginRider,
  getRiderProfile,
  logoutRider,
};
