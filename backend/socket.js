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
// listen or accepting  co-ordinates of rider and saved in db
        socket.on("updateLocationRider",async (data)=>{
            const {userId, location}=data;
            if(!location || !location.ltd || !location.lng){
                console.log("Invalid location");
                return;
            }   
            await riderModel.findByIdAndUpdate(userId,{
                location:{
                    ltd: location.ltd,
                    lng: location.lng,
                }
            })
        })

        socket.on("updateLocationUser",async (data)=>{
            const {userId, location}=data;

            if(!location || !location.ltd || !location.lng){
                console.log("Invalid location");
                return;
            }    
            
            await userModel.findByIdAndUpdate(userId,{
                location:{
                    ltd: location.ltd,
                    lng: location.lng,
                }
            })
        })

        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
        })

      
    })

    return io;
}


function sendMessageToSocket(socketId, msgObj){
    console.log(msgObj,"sendMessagetoSocket")
   if(io){
    io.to(socketId).emit(msgObj.event, msgObj.data);
   }else{
    console.log("Socket is not initialized");       
   }
}

module.exports = {socketInit, sendMessageToSocket};
