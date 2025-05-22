const { check, validationResult } = require('express-validator');

const signupValidator = [
    check('username', 'Name is required').not().isEmpty(),
    check('ffusername')
        .optional({ nullable: true, checkFalsy: true })
        .trim(),
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('uid', 'Please enter a valid UID')
        .isLength({ min: 10, max: 10 })
        .isNumeric(),
]

module.exports = signupValidator