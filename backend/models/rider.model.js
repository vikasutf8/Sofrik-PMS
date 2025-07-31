const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const riderSchema = new Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3, "First Name must be at least 3 characters long"],
        },
        lastname:{
            type: String,
            minlength:[3, "Name must be at least 3 characters long"],
        },
    },
    email:{
        type: String,
        required: true,
        unique: true, 
    },
    password:{
        type: String,
        required: true,
        select :false
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ["Active","Inactive"],
        default: "Inactive",
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength:[3, "Color must be at least 3 characters long"],
        },
        plate:{
            type: String,
            required: true,
            minlength:[6, "Plate must be at least 3 characters long"],
        },
        capacity:{
            type: Number,
            required: true,
            minlength:[1, "Capacity must be at least 1 characters long"],
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ["car","motorcycle","auto"],
        },
        },
    location:{
        lat:{
            type: Number,
        },
        lng:{
            type: Number,
        }
    }
       
},{
    timestamps :true
})


riderSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );
    return token;
};

riderSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

riderSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};



const riderModel = mongoose.model("rider", riderSchema);
module.exports = riderModel;