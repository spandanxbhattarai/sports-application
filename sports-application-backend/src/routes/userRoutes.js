import express from 'express';
import * as userController from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import { registerDto, loginDto, verifyEmailDto, updateProfileDto } from '../dtos/userDto.js';
import { validate } from '../middleware/validation.js';
import { body } from 'express-validator';
import { upload } from '../services/fileUploadService.js';

const router = express.Router();

// Public routes
router.post('/register', upload.single('profilePicture'), registerDto, validate, userController.register);
router.post('/login', loginDto, validate, userController.login);
router.post('/verify-email', verifyEmailDto, validate, userController.verifyEmail);
router.post('/resend-verification', [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
], validate, userController.resendVerification);

// Protected routes
router.use(verifyToken);

// User routes
router.put('/profile', updateProfileDto, validate, userController.updateProfile);
router.post('/deactivate', userController.deactivateAccount);
router.post('/delete', userController.deleteAccount);
router.post('/activate', userController.activateAccount);

// Admin routes
router.post('/admin/activate/:userId', isAdmin, userController.activateAccount);

export default router; 