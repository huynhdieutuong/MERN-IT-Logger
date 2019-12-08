const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please add first name']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please add last name']
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tech', TechSchema);
