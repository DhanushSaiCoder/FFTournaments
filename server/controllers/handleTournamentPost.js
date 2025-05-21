const Tournament = require('../models/Tournament.model');

const handleTournamentPost = async (req, res) => {
    try {
        console.log("Incoming Tournament Data:", req.body);

        const tournamentData = req.body;

        const tournament = new Tournament(tournamentData);

        await tournament.save();

        res.status(201).json({
            success: true,
            message: 'Tournament created successfully',
            tournament
        });
    } catch (error) {
        console.error("Error creating tournament:", error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating tournament',
            error: error.message
        });
    }
};

module.exports = handleTournamentPost;
