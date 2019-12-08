const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  message: {
    type: String,
    required: [true, 'Please add a message'],
    trim: true,
    unique: true
  },
  tech: {
    type: Schema.Types.ObjectId,
    ref: 'Tech',
    required: [true, 'Please select a tech']
  },
  attention: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Log', LogSchema);
