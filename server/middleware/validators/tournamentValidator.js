// validations/tournamentValidator.js
const { body } = require('express-validator')
const validateTournament = [
    body('isPopular')
        .exists().withMessage('`isPopular` field is required')
        .isBoolean().withMessage('`isPopular` must be a boolean'),
    // frequency: required, one of allowed values
    body('frequency')
        .exists().withMessage('Frequency is required')
        .isIn(['Daily', 'Weekly', 'Monthly', 'One-time'])
        .withMessage('Frequency must be one of Daily, Weekly, Monthly, One-time'),

    // name: required, non-empty string
    body('name')
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim()
        .notEmpty().withMessage('Name cannot be empty'),

    // tags: if present, must be array of strings
    body('tags')
        .optional()
        .isArray().withMessage('Tags must be an array')
        .bail()
        .custom((arr) => arr.every(tag => typeof tag === 'string'))
        .withMessage('Each tag must be a string'),

    // details: same as tags
    body('details')
        .optional()
        .isArray().withMessage('Details must be an array')
        .bail()
        .custom((arr) => arr.every(d => typeof d === 'string'))
        .withMessage('Each detail must be a string'),

    // gameMode: required, one of allowed values
    body('gameMode')
        .exists().withMessage('Game mode is required')
        .isIn(['BR', 'CS', 'DM', 'TDM'])
        .withMessage('Game mode must be one of BR, CS, DM, TDM'),

    // maxPrizePool: required, number ≥ 0
    body('maxPrizePool')
        .exists().withMessage('Max prize pool is required')
        .isFloat({ min: 0 }).withMessage('Max prize pool must be a non-negative number'),

    // maxPlayers: required, integer ≥ 1
    body('maxPlayers')
        .exists().withMessage('Max players is required')
        .isInt({ min: 1 }).withMessage('Max players must be at least 1'),

    // prizePerKill: optional, number ≥ 0
    body('prizePerKill')
        .optional()
        .isFloat({ min: 0 }).withMessage('Prize per kill must be a non-negative number'),

    // entryFee: required, number ≥ 0
    body('entryFee')
        .exists().withMessage('Entry fee is required')
        .isFloat({ min: 0 }).withMessage('Entry fee must be a non-negative number'),

    // startDate & endDate: required, valid ISO dates; endDate > startDate
    body('startDate')
        .exists().withMessage('Start date is required')
        .isISO8601().toDate().withMessage('Start date must be a valid date'),

    body('endDate')
        .exists().withMessage('End date is required')
        .isISO8601().toDate().withMessage('End date must be a valid date')
        .bail()
        .custom((endDate, { req }) => {
            if (new Date(endDate) <= new Date(req.body.startDate)) {
                throw new Error('End date must be after start date');
            }
            return true;
        }),

    // startTime: required, non-empty string (you can add regex if format is strict)
    body('startTime')
        .exists().withMessage('Start time is required')
        .isString().withMessage('Start time must be a string')
        .trim().notEmpty().withMessage('Start time cannot be empty'),

    // startDateTime: required, valid ISO date
    body('startDateTime')
        .exists().withMessage('Start dateTime is required')
        .isISO8601().toDate().withMessage('Start dateTime must be a valid datetime'),

    // prizes: required object with first, second, third
    body('prizes').exists().withMessage('Prizes object is required'),
    body('prizes.first')
        .exists().withMessage('Prizes.first is required')
        .isFloat({ min: 0 }).withMessage('First prize must be a non-negative number'),
    body('prizes.second')
        .optional({ nullable: true })
        .isFloat({ min: 0 }).withMessage('Second prize must be a non-negative number or null'),
    body('prizes.third')
        .optional({ nullable: true })
        .isFloat({ min: 0 }).withMessage('Third prize must be a non-negative number or null'),

    // prizeDetails: optional array of strings
    body('prizeDetails')
        .optional()
        .isArray().withMessage('Prize details must be an array')
        .bail()
        .custom(arr => arr.every(p => typeof p === 'string'))
        .withMessage('Each prize detail must be a string'),

    // importantInformation: optional object with sub‐arrays
    body('importantInformation').optional(),
    ...['details', 'rules', 'howToJoin', 'howToClaimPrizeMoney'].map(field =>
        body(`importantInformation.${field}`)
            .optional()
            .isArray().withMessage(`${field} must be an array`)
            .bail()
            .custom(arr => arr.every(i => typeof i === 'string'))
            .withMessage(`Each item in ${field} must be a string`)
    ),
];

module.exports = validateTournament