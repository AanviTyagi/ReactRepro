const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'neutral']
  },
  symptoms: [{
    type: String,
    enum: ['headache', 'cramps', 'bloating', 'fatigue', 'nausea', 'none']
  }],
  notes: {
    type: String,
    maxlength: 500
  }
});

// Index for efficient querying by user and date
moodSchema.index({ user: 1, date: 1 });

const Mood = mongoose.model('Mood', moodSchema);
module.exports = Mood; 