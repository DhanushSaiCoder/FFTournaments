const express = require('express');

const router = express.Router();
const tournamentValidator = require("../middleware/validators/tournamentValidator")
const { check, validationResult } = require('express-validator');
const handleTournamentPost = require('../controllers/handleTournamentPost');
const Tournament = require('../models/Tournament.model');


router.get('/', async (req, res) => {
    //get all the tournaments and send them to the response
    try {
        const tournaments = await Tournament.find();
        res.json(tournaments);
    } catch (error) {
        console.error("Error fetching tournaments:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id); // or use .findOne({_id: req.params.id})
        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }
        res.json(tournament);
    } catch (error) {
        console.error("Error fetching tournament:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


router.post('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    handleTournamentPost(req, res)
})
router.patch(
  '/:id',
  // Optional: you could add auth middleware here, e.g. ensureAdmin
  [
    check('isPopular')
      .exists().withMessage('isPopular field is required')
      .isBoolean().withMessage('isPopular must be a boolean'),
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { isPopular } = req.body;
    try {
      const tournament = await Tournament.findById(req.params.id);
      if (!tournament) {
        return res.status(404).json({ message: 'Tournament not found' });
      }

      tournament.isPopular = isPopular;
      await tournament.save();

      res.json({ message: 'isPopular updated', tournament });
    } catch (err) {
      console.error('Error updating isPopular:', err);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  }
);




module.exports = router;