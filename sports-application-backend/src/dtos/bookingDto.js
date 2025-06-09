import { body } from 'express-validator';

export const createBookingDto = [
  body('organization_id')
    .notEmpty()
    .withMessage('Organization ID is required')
    .isMongoId()
    .withMessage('Invalid organization ID'),
  
  body('sport_id')
    .notEmpty()
    .withMessage('Sport ID is required')
    .isMongoId()
    .withMessage('Invalid sport ID'),
  
  body('booking_date')
    .notEmpty()
    .withMessage('Booking date is required')
    .isISO8601()
    .withMessage('Invalid booking date format'),
  
  body('start_time')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid start time format (HH:MM)'),
  
  body('end_time')
    .notEmpty()
    .withMessage('End time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid end time format (HH:MM)'),
  
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled', 'postponed'])
    .withMessage('Invalid status value'),
  
  body('payment_status')
    .optional()
    .isIn(['pending', 'paid', 'failed', 'refunded'])
    .withMessage('Invalid payment status value'),
  
  body('cancellation_reason')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Cancellation reason must not exceed 500 characters'),
  
  body('postponement_date')
    .optional()
    .isISO8601()
    .withMessage('Invalid postponement date format')
];

export const updateBookingDto = [
  body('organization_id')
    .optional()
    .isMongoId()
    .withMessage('Invalid organization ID'),
  
  body('sport_id')
    .optional()
    .isMongoId()
    .withMessage('Invalid sport ID'),
  
  body('booking_date')
    .optional()
    .isISO8601()
    .withMessage('Invalid booking date format'),
  
  body('start_time')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid start time format (HH:MM)'),
  
  body('end_time')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid end time format (HH:MM)'),
  
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled', 'postponed'])
    .withMessage('Invalid status value'),
  
  body('payment_status')
    .optional()
    .isIn(['pending', 'paid', 'failed', 'refunded'])
    .withMessage('Invalid payment status value'),
  
  body('cancellation_reason')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Cancellation reason must not exceed 500 characters'),
  
  body('postponement_date')
    .optional()
    .isISO8601()
    .withMessage('Invalid postponement date format')
]; 