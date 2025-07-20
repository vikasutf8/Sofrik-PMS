
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongouri = process.env.MONGODB_URI;
        if(!mongouri) {
            throw new Error("MongoDB URI not found");
        }
        const conn = await mongoose.connect(mongouri);
        console.log("Connected to MongoDB database", conn.connection.host);

        //handle connection error
        conn.on("error", (err) => {
            console.log("Error connecting to MongoDB database", err);
        });

        conn.on("disconnected", () => {
            console.log("MongoDB connection disconnected");
        });

    } catch (error) {
        console.log("Datebase connection error", error);
    }
}


module.exports = connectDB;