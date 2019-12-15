const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechSchema = new Schema(
  {
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
    fullName: String,
    createAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

TechSchema.pre('save', function() {
  this.fullName = `${this.firstName} ${this.lastName}`;
});

TechSchema.virtual('logs', {
  ref: 'Log',
  localField: '_id',
  foreignField: 'tech',
  justOne: false
});

module.exports = mongoose.model('Tech', TechSchema);
