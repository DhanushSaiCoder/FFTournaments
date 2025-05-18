const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User.model');
const auth = require('../middleware/auth.middleware');
const handleGoogleAuth = require('../controllers/handleGoogleAuth')
const authMiddleware = require('../middleware/auth.middleware')
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

router.patch('/uid', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;            // set by auth.middleware
        const { uid } = req.body;

        // 1. Ensure a UID was provided
        if (!uid) {
            return res
                .status(400)
                .json({ success: false, message: 'UID is required' });
        }

        // 2. Prevent assigning a UID that’s already in use by another user
        const conflict = await User.findOne({ uid });
        if (conflict && conflict._id.toString() !== userId) {
            return res
                .status(400)
                .json({ success: false, message: 'UID already in use' });
        }

        // 3. Perform the update and return the new user doc
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { uid },
            { new: true, runValidators: true }
        );

        return res.json({ success: true, user: updatedUser });
    } catch (err) {
        console.error('Error updating UID:', err);
        return res
            .status(500)
            .json({ success: false, message: 'Server error' });
    }
});
module.exports = router;