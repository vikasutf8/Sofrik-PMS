require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoute = require("../routes/user.route.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/users",userRoute);

module.exports = app;