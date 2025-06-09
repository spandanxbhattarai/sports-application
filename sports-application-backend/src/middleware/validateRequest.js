import { validationResult } from 'express-validator';
import { ValidationError } from '../utils/errors.js';

export const validateRequest = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      throw new ValidationError(errorMessages.join(', '));
    }

    next();
  };
}; 