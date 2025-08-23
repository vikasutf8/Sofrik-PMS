
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Task = require('./task.modal.js');

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

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    if (!req.body.user_id || !req.body.title || !req.body.description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({data:task,message:'Task created successfully'});    
  } catch (err) {
    res.status(500).json({ message: err.message+" internal server error" });
  }
});

// -  GET /tasks - Get all tasks



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});