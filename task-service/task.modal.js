
// user_id, title, description

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  
},{
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);