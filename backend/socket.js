const socketIo = require("socket.io");
const http = require("http");
const userModel = require("./models/user.model");
const riderModel = require("./models/rider.model");

let io;

function socketInit(server){
    io = socketIo(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);

        socket.on("join",async (data)=>{
          
            const {userId, userType}=data;
            console.log(`User ${userId} joined as ${userType}`);
            if(userType === "rider"){
                const rider = await riderModel.findByIdAndUpdate(userId,{socketId: socket.id})
            }else if(userType === "user"){
                const user = await userModel.findByIdAndUpdate(userId,{socketId: socket.id})
            }else{
                console.log("Invalid user type");
            }
        })

        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
        })

      
    })

    return io;
}


function sendMessageToSocket(socketId, message){
   if(io){
    io.to(socketId).emit("message", message);
   }else{
    console.log("Socket is not initialized");       
   }
}

module.exports = {socketInit, sendMessageToSocket};
