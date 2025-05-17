const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User.model');
const auth = require('../middleware/auth.middleware');
const signupValidator = require("../middleware/validators/signupValidator")

const handleSignUp = require('../controllers/handleSignUp')

router.post('/signup', signupValidator, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    handleSignUp(req, res);
})

module.exports = router;