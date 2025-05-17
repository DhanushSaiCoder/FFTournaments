const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User.model');
const auth = require('../middleware/auth.middleware');
const handleGoogleAuth = require('../controllers/handleGoogleAuth')

//validators
const signupValidator = require("../middleware/validators/signupValidator")
const loginValidator = require('../middleware/validators/loginValidator')

//controllers
const handleSignUp = require('../controllers/handleSignUp')
const handleLogin = require('../controllers/handleLogin')
//singup route
router.post('/signup', signupValidator, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    handleSignUp(req, res);
})

router.post('/google', handleGoogleAuth); // <-- new route

//login route
router.post('/login', loginValidator, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    handleLogin(req, res);
})
module.exports = router;