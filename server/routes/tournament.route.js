const express = require('express');
const { validationResult } = require('express-validator');
const tournamentValidator = require('../middleware/validators/tournamentValidator');
const validatePopular = require('../middleware/validators/validatePopular');
const handleTournamentPost = require('../controllers/handleTournamentPost');
const Tournament = require('../models/Tournament.model');

const router = express.Router();

// GET all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// GET single tournament
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.json(tournament);
  } catch (error) {
    console.error('Error fetching tournament:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// POST new tournament
router.post(
  '/',
  tournamentValidator,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    handleTournamentPost(req, res);
  }
);

// PATCH update tournament (partial updates allowed)
router.patch(
  '/:id',
  validatePopular,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return (async () => {
      try {
        const updates = req.body;
        const tournament = await Tournament.findByIdAndUpdate(
          req.params.id,
          { $set: updates },
          { new: true, runValidators: true }
        );

        if (!tournament) {
          return res.status(404).json({ message: 'Tournament not found' });
        }

        res.json({
          success: true,
          message: 'Tournament updated successfully',
          tournament,
        });
      } catch (error) {
        console.error('Error updating tournament:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    })();
  }
);

// DELETE a tournament
router.delete('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.json({
      success: true,
      message: 'Tournament deleted successfully',
      tournament
    });
  } catch (error) {
    console.error('Error deleting tournament:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
