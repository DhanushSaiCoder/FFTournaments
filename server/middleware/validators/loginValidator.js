const { check, validationResult } = require('express-validator');

const loginValidator = [
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'invalid password'
    ).isLength({ min: 6 }),
]

module.exports = loginValidator