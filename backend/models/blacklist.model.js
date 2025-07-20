const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blacklistSchema = new Schema({
    token:{
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expire:86400
    }
});


const blacklistModel = mongoose.model("blacklist", blacklistSchema);
module.exports = blacklistModel;