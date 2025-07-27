

const http = require("http");
const app = require("./app");
const connectDB = require("./db/db.config");
const { socketInit } = require("./socket.js");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

connectDB();

socketInit(server);

server.listen(port, () => {
  
  console.log(`Server running on port ${port}`);
})
