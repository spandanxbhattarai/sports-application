import { body } from 'express-validator';

export const createOrganizationDto = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('plan_id')
    .notEmpty()
    .withMessage('Plan ID is required')
    .isMongoId()
    .withMessage('Invalid plan ID'),
  
  body('location.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  
  body('location.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  
  body('domain')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Domain must be between 3 and 50 characters')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Domain can only contain lowercase letters, numbers, and hyphens'),
  
  body('website.background')
    .optional()
    .isHexColor()
    .withMessage('Invalid background color'),
  
  body('website.textTitleColor')
    .optional()
    .isHexColor()
    .withMessage('Invalid text title color'),
  
  body('website.textDescriptionColor')
    .optional()
    .isHexColor()
    .withMessage('Invalid text description color'),
  
  body('website.navbarBackground')
    .optional()
    .isHexColor()
    .withMessage('Invalid navbar background color'),
  
  body('website.navbarTextColor')
    .optional()
    .isHexColor()
    .withMessage('Invalid navbar text color'),
  
  body('timeSlotGap')
    .optional()
    .isInt({ min: 15, max: 60 })
    .withMessage('Time slot gap must be between 15 and 60 minutes'),
  
  body('sports')
    .isArray()
    .withMessage('Sports must be an array'),
  
  body('sports.*.sport_id')
    .isMongoId()
    .withMessage('Invalid sport ID'),
  
  body('sports.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('sports.*.schedule')
    .isArray()
    .withMessage('Schedule must be an array'),
  
  body('sports.*.schedule.*.day')
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    .withMessage('Invalid day'),
  
  body('sports.*.schedule.*.start_time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid start time format (HH:MM)'),
  
  body('sports.*.schedule.*.end_time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid end time format (HH:MM)'),
  
  body('sports.*.max_participants')
    .isInt({ min: 1 })
    .withMessage('Max participants must be a positive number'),
  
  body('content.hero.title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Hero title must not exceed 100 characters'),
  
  body('content.hero.subtitle')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Hero subtitle must not exceed 200 characters'),
  
  body('content.hero.image_url')
    .optional()
    .isURL()
    .withMessage('Invalid hero image URL'),
  
  body('content.features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),
  
  body('content.features.*.title')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Feature title must not exceed 50 characters'),
  
  body('content.features.*.description')
    .trim()
    .isLength({ max: 200 })
    .withMessage('Feature description must not exceed 200 characters'),
  
  body('content.features.*.icon_url')
    .isURL()
    .withMessage('Invalid feature icon URL'),
  
  body('content.sponsors')
    .optional()
    .isArray()
    .withMessage('Sponsors must be an array'),
  
  body('content.sponsors.*.name')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Sponsor name must not exceed 50 characters'),
  
  body('content.sponsors.*.logo_url')
    .isURL()
    .withMessage('Invalid sponsor logo URL'),
  
  body('content.about.title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('About title must not exceed 100 characters'),
  
  body('content.about.description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('About description must not exceed 1000 characters'),
  
  body('content.about.image_url')
    .optional()
    .isURL()
    .withMessage('Invalid about image URL'),
  
  body('content.services')
    .optional()
    .isArray()
    .withMessage('Services must be an array'),
  
  body('content.services.*.title')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Service title must not exceed 50 characters'),
  
  body('content.services.*.description')
    .trim()
    .isLength({ max: 200 })
    .withMessage('Service description must not exceed 200 characters'),
  
  body('content.services.*.image_url')
    .isURL()
    .withMessage('Invalid service image URL'),
  
  body('content.members')
    .optional()
    .isArray()
    .withMessage('Members must be an array'),
  
  body('content.members.*.name')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Member name must not exceed 50 characters'),
  
  body('content.members.*.position')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Member position must not exceed 50 characters'),
  
  body('content.members.*.image_url')
    .isURL()
    .withMessage('Invalid member image URL')
];

export const updateOrganizationDto = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('location.latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Invalid latitude'),
  
  body('location.longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Invalid longitude'),
  
  body('domain')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Domain must be between 3 and 50 characters')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Domain can only contain lowercase letters, numbers, and hyphens'),
  
  body('website.background')
    .optional()
    .isHexColor()
    .withMessage('Invalid background color'),
  
  body('website.textTitleColor')
    .optional()
    .isHexColor()
    .withMessage('Invalid text title color'),
  
  body('website.textDescriptionColor')
    .optional()
    .isHexColor()
    .withMessage('Invalid text description color'),
  
  body('website.navbarBackground')
    .optional()
    .isHexColor()
    .withMessage('Invalid navbar background color'),
  
  body('website.navbarTextColor')
    .optional()
    .isHexColor()
    .withMessage('Invalid navbar text color'),
  
  body('timeSlotGap')
    .optional()
    .isInt({ min: 15, max: 60 })
    .withMessage('Time slot gap must be between 15 and 60 minutes'),
  
  body('sports')
    .optional()
    .isArray()
    .withMessage('Sports must be an array'),
  
  body('sports.*.sport_id')
    .isMongoId()
    .withMessage('Invalid sport ID'),
  
  body('sports.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('sports.*.schedule')
    .isArray()
    .withMessage('Schedule must be an array'),
  
  body('sports.*.schedule.*.day')
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    .withMessage('Invalid day'),
  
  body('sports.*.schedule.*.start_time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid start time format (HH:MM)'),
  
  body('sports.*.schedule.*.end_time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid end time format (HH:MM)'),
  
  body('sports.*.max_participants')
    .isInt({ min: 1 })
    .withMessage('Max participants must be a positive number'),
  
  body('content.hero.title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Hero title must not exceed 100 characters'),
  
  body('content.hero.subtitle')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Hero subtitle must not exceed 200 characters'),
  
  body('content.hero.image_url')
    .optional()
    .isURL()
    .withMessage('Invalid hero image URL'),
  
  body('content.features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),
  
  body('content.features.*.title')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Feature title must not exceed 50 characters'),
  
  body('content.features.*.description')
    .trim()
    .isLength({ max: 200 })
    .withMessage('Feature description must not exceed 200 characters'),
  
  body('content.features.*.icon_url')
    .isURL()
    .withMessage('Invalid feature icon URL'),
  
  body('content.sponsors')
    .optional()
    .isArray()
    .withMessage('Sponsors must be an array'),
  
  body('content.sponsors.*.name')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Sponsor name must not exceed 50 characters'),
  
  body('content.sponsors.*.logo_url')
    .isURL()
    .withMessage('Invalid sponsor logo URL'),
  
  body('content.about.title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('About title must not exceed 100 characters'),
  
  body('content.about.description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('About description must not exceed 1000 characters'),
  
  body('content.about.image_url')
    .optional()
    .isURL()
    .withMessage('Invalid about image URL'),
  
  body('content.services')
    .optional()
    .isArray()
    .withMessage('Services must be an array'),
  
  body('content.services.*.title')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Service title must not exceed 50 characters'),
  
  body('content.services.*.description')
    .trim()
    .isLength({ max: 200 })
    .withMessage('Service description must not exceed 200 characters'),
  
  body('content.services.*.image_url')
    .isURL()
    .withMessage('Invalid service image URL'),
  
  body('content.members')
    .optional()
    .isArray()
    .withMessage('Members must be an array'),
  
  body('content.members.*.name')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Member name must not exceed 50 characters'),
  
  body('content.members.*.position')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Member position must not exceed 50 characters'),
  
  body('content.members.*.image_url')
    .isURL()
    .withMessage('Invalid member image URL')
]; 