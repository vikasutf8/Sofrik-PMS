const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength:[3, "First Name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minlength:[3, "Name must be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select :fasle
    },
    socketId:{
        type: String,
    }
},{
    timestamps: true,
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};



const userModel = mongoose.model("user", userSchema);
module.exports = userModel;