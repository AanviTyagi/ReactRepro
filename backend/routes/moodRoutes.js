const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Mood = require('../models/Mood');

// Get all moods for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const moods = await Mood.find({ 
      user: req.user.userId,
      // Only fetch moods from the last 30 days
      date: { 
        $gte: new Date(new Date().setDate(new Date().getDate() - 30))
      }
    }).sort({ date: -1 });
    
    res.json(moods);
  } catch (err) {
    console.error('Error fetching moods:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Add a new mood entry
router.post('/', auth, async (req, res) => {
  try {
    const { date, mood, notes } = req.body;
    
    // Check if an entry already exists for this date
    const existingMood = await Mood.findOne({ 
      user: req.user.userId,
      date: {
        $gte: new Date(new Date(date).setHours(0,0,0,0)),
        $lt: new Date(new Date(date).setHours(23,59,59,999))
      }
    });
    
    if (existingMood) {
      // Update existing entry
      existingMood.mood = mood || existingMood.mood;
      existingMood.notes = notes || existingMood.notes;
      await existingMood.save();
      return res.json(existingMood);
    }
    
    // Create new entry
    const newMood = new Mood({
      user: req.user.userId,
      date: date ? new Date(date) : new Date(),
      mood,
      notes
    });
    
    await newMood.save();
    res.json(newMood);
  } catch (err) {
    console.error('Error saving mood:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Get mood statistics for the user
router.get('/stats', auth, async (req, res) => {
  try {
    // Get overall mood distribution
    const overallStats = await Mood.aggregate([
      { 
        $match: { 
          user: req.user.userId,
          mood: { $exists: true }
        } 
      },
      { 
        $group: { 
          _id: '$mood',
          count: { $sum: 1 } 
        }
      }
    ]);

    // Get mood trends for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const monthlyTrends = await Mood.aggregate([
      {
        $match: {
          user: req.user.userId,
          date: { $gte: thirtyDaysAgo },
          mood: { $exists: true }
        }
      },
      {
        $group: {
          _id: {
            mood: '$mood',
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);
    
    res.json({
      overall: overallStats,
      monthly: monthlyTrends
    });
  } catch (err) {
    console.error('Error fetching mood statistics:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router; 