import { body } from 'express-validator';

export const registerDto = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
    .withMessage('Password must contain at least one letter and one number'),
  
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Invalid phone number format'),
  
  body('role')
    .optional()
    .isIn(['user', 'organizationOwner'])
    .withMessage('Invalid role'),
  
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ max: 200 })
    .withMessage('Address must not exceed 200 characters'),
  
  body('location[latitude]')
    .notEmpty()
    .withMessage('Latitude is required')
    .custom((value) => {
      const num = parseFloat(value);
      if (isNaN(num) || num < -90 || num > 90) {
        throw new Error('Invalid latitude value');
      }
      return true;
    }),
  
  body('location[longitude]')
    .notEmpty()
    .withMessage('Longitude is required')
    .custom((value) => {
      const num = parseFloat(value);
      if (isNaN(num) || num < -180 || num > 180) {
        throw new Error('Invalid longitude value');
      }
      return true;
    })
];

export const loginDto = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
];

export const verifyEmailDto = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('confirmationCode')
    .trim()
    .notEmpty()
    .withMessage('Confirmation code is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('Confirmation code must be 6 characters long')
];

export const updateProfileDto = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('password')
    .optional()
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
    .withMessage('Password must contain at least one letter and one number'),
  
  body('phoneNumber')
    .optional()
    .trim()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Invalid phone number format'),
  
  body('profile.photoUrl')
    .optional()
    .isURL()
    .withMessage('Invalid photo URL'),
  
  body('profile.address')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address must not exceed 200 characters'),
  
  body('profile.location.latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  
  body('profile.location.longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude')
]; 