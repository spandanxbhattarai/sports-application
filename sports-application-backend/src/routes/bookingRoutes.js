import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
// import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { createBookingDto, updateBookingDto } from '../dtos/bookingDto.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/', bookingController.getAllBookings);
router.get('/active', bookingController.getActiveBookings);
router.get('/:id', bookingController.getBookingById);

// Protected routes (authenticated users)
// router.use(protect);

// User-specific routes
router.get('/user/my-bookings', bookingController.getBookingsByUser);
router.get('/user/upcoming', bookingController.getUpcomingBookings);
router.get('/user/past', bookingController.getPastBookings);

// Organization-specific routes
router.get('/organization/my-bookings', bookingController.getBookingsByOrganization);

// Organization admin routes
// router.use(restrictTo('admin'));

router.post(
  '/',
  validateRequest(createBookingDto),
  bookingController.createBooking
);

router
  .route('/:id')
  .patch(
    validateRequest(updateBookingDto),
    bookingController.updateBooking
  )
  .delete(bookingController.deleteBooking);

// Status update
router.patch(
  '/:id/status',
  validateRequest([
    body('is_active').isBoolean().withMessage('is_active must be a boolean value')
  ]),
  bookingController.updateBookingStatus
);

// Filter routes
router.get('/filter/date-range', bookingController.getBookingsByDateRange);
router.get('/filter/sport', bookingController.getBookingsBySport);
router.get('/filter/status', bookingController.getBookingsByStatus);
router.get('/filter/payment-status', bookingController.getBookingsByPaymentStatus);
router.get('/filter/slot', bookingController.getBookingsBySlot);
router.get('/filter/date', bookingController.getBookingsByDate);

// Combined filter routes
router.get('/filter/user-date', bookingController.getBookingsByUserAndDate);
router.get('/filter/organization-date', bookingController.getBookingsByOrganizationAndDate);
router.get('/filter/user-sport', bookingController.getBookingsByUserAndSport);
router.get('/filter/organization-sport', bookingController.getBookingsByOrganizationAndSport);

export default router; 