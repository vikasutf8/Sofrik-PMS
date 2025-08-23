
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Notification = require('./notification.modal.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3000;

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.log(err,
    "MongoDB Connection Error. Please make sure MongoDB is running."
  );
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});