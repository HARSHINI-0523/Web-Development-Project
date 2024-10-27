const express = require('express');
const router = express.Router();
const auth=require('../middleware/authMiddleware');
const Event = require('../models/Event');

// Create a new event
router.post('/',auth.protect, async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    console.log(req.body);
    await newEvent.save();
    
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error });
  }
});

// Get events for a specific month
router.get('/month/:year/:month', async (req, res) => {
    const { year, month } = req.params;
    
    // Create start and end dates that encompass the entire month
    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)); // Start of the month at midnight UTC
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)); // End of the month at 23:59:59 UTC
  
    console.log('Start Date:', startDate.toISOString());
    console.log('End Date:', endDate.toISOString());
  
    try {
      // Query events within the entire date range of the month
      const events = await Event.find({
        date: { $gte: startDate, $lte: endDate }
      });
      console.log('Fetched Events:', events);
      res.status(200).json(events);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      res.status(500).json({ message: 'Failed to fetch events', error });
    }
  });
  
  

// Get events for a specific date
router.get('/date/:date', async (req, res) => {
  try {
    const events = await Event.find({ date: new Date(req.params.date) });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
});

// Get all yearly events
router.get('/year/:year', async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31);

    const yearlyEvents = await Event.find({
      date: { $gte: startOfYear, $lte: endOfYear }
    });

    res.status(200).json(yearlyEvents);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch yearly events', error });
  }
});

// Delete an event by ID
router.delete('/:id', auth.protect, async (req, res) => {
  const eventId = req.params.id; // Get the event ID from the request parameters

  try {
    const event = await Event.findByIdAndDelete(eventId); // Find and delete the event by ID

    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    return res.status(200).json({ message: 'Event deleted successfully.' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
