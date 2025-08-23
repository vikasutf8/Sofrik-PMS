
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Task = require('./task.modal.js');
const amqp = require('amqplib');

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


// RabbitMQ :channel | connection
// Re-try connection if it fails
let channel;
let connection;


async function connectionRabbitMQ(retries = 100, delay = 3000) {
  const rabbitmqUri ="amqp://rabbitmq";
  while (retries) {
    try {
      connection = await amqp.connect(rabbitmqUri);
      if (!connection) {
        console.log('Connection not created yet');
      }
      channel = await connection.createChannel();
      await channel.assertQueue("task-queue-created");
      console.log("Connected to RabbitMQ");
      return;
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error.message);
      retries--;
      console.log(`Retrying in ${delay} ms... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  console.error("Failed to connect to RabbitMQ after retries. Channel will remain unavailable.");
}


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

    // Publish message to RabbitMQ
    const message = {task_id: task._id, user_id: task.user_id, title: task.title};

    if(!channel ) {
      console.log('Channel not created yet');
      return res.status(503).json({ error: 'Channel not created yet' });
      // await connectionRabbitMQ();
    }
    if(channel && connection) {
      channel.sendToQueue('task-queue-created', Buffer.from(JSON.stringify(message)));
      console.log('Message sent to RabbitMQ');
    }

    res.status(201).json({data:task,message:'Task created successfully'});    
  } catch (err) {
    res.status(500).json({ message: err.message+" internal server error" });
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectionRabbitMQ();
});
