const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
  required: false,
  default: 'other'
  },
  image: {
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  capacity: {
    type: Number,
    required: false
  },
  registeredCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ isActive: 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
