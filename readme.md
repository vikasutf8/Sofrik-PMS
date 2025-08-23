# Task Management App
-  Node.js and Express.js Microservices
-  MongoDB
-  Docker & Docker Compose
-  RabbitMQ

# HLD Design & Architecture
![alt text](image.png)

# User Service
### Router
-  GET /users - Get all users
-  POST /users - Create user

### Docker image
```bash
 docker pull mongodb/mongodb-community-server:latest
 docker run -d -p 27017:27017 mongodb/mongodb-community-server:latest
```


# Task Service
### Router
-  GET /tasks - Get all tasks
-  POST /tasks - Create task

### Docker image
```bash
 docker pull mongodb/mongodb-community-server:latest
 docker run -d -p 27017:27017 mongodb/mongodb-community-server:latest
 ```

# Notification Service

### Router


## Middleware
### RabbitMQ 
-We'll call our message publisher (sender) send.js and our message consumer (receiver) receive.js. The publisher will connect to RabbitMQ, send a single message, then exit.

```bash
npm install amqplib
```

- connect to RabbitMQ server :send.js
```bash
var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(error0, connection) {});
```

### Docker image
```bash
 docker pull rabbitmq:3.13.7-management
 docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:3.13.7-management
 ```