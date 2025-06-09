import { body } from 'express-validator';

export const createRedeemTokenDto = [
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Code is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Code must be between 3 and 20 characters')
    .matches(/^[A-Z0-9-]+$/)
    .withMessage('Code can only contain uppercase letters, numbers, and hyphens'),
  
  body('discount_amount')
    .notEmpty()
    .withMessage('Discount amount is required')
    .isFloat({ min: 0 })
    .withMessage('Discount amount must be a positive number'),
  
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active must be a boolean value'),
  
  body('created_by')
    .notEmpty()
    .withMessage('Created by is required')
    .isMongoId()
    .withMessage('Invalid user ID')
];

export const updateRedeemTokenDto = [
  body('code')
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Code must be between 3 and 20 characters')
    .matches(/^[A-Z0-9-]+$/)
    .withMessage('Code can only contain uppercase letters, numbers, and hyphens'),
  
  body('discount_amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discount amount must be a positive number'),
  
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active must be a boolean value')
]; 