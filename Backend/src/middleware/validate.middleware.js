const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

// Reusable middleware: checks express-validator results, throws on first error
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }
  next();
};

module.exports = validate;
