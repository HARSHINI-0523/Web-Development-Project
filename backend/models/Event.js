const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
  },
  location: {
    type: String,
  },
  cost: {
    type: String,
  },
  activities: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  contactPhone: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Event', eventSchema);
