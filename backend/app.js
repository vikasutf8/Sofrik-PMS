require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.route.js");
const riderRoute = require("./routes/rider.route.js");
const mapsRoute = require("./routes/maps.route.js");
const rideRoute =require("./routes/ride.routes.js")
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/maps",mapsRoute);
app.use("/api/v1/users",userRoute);
app.use("/api/v1/riders",riderRoute);
app.use("/api/v1/rides",rideRoute)

module.exports = app;