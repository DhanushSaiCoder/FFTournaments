const express = require('express');

const router = express.Router();
const tournamentValidator = require("../middleware/validators/tournamentValidator")
const { check, validationResult } = require('express-validator');
const handleTournamentPost = require('../controllers/handleTournamentPost')

router.post('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    handleTournamentPost(req, res)
})

module.exports= router;