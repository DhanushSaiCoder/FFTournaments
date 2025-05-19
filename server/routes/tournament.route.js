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

router.post('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    handleTournamentPost(req, res)
})



module.exports = router;