// middleware/validators/validatePopular.js

const { body, validationResult } = require('express-validator');

const validatePopular = [
  body('isPopular')
    .exists().withMessage('`isPopular` field is required')
    .isBoolean().withMessage('`isPopular` must be a boolean'),
  // handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return first error or full array, as you prefer
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validatePopular;
