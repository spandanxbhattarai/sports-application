import express from 'express';
import advertisementController from '../controllers/advertisementController.js';
// import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { createAdvertisementDto, updateAdvertisementDto } from '../dtos/advertisementDto.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/', advertisementController.getAllAdvertisements);
router.get('/active', advertisementController.getActiveAdvertisements);
router.get('/:id', advertisementController.getAdvertisementById);

// Protected routes (organization members)
// router.use(protect);

// Organization-specific routes
router.get('/organization/my-advertisements', advertisementController.getAdvertisementsByOrganization);

// Organization admin routes
// router.use(restrictTo('admin'));

router.post(
  '/',
  validateRequest(createAdvertisementDto),
  advertisementController.createAdvertisement
);

router
  .route('/:id')
  .patch(
    validateRequest(updateAdvertisementDto),
    advertisementController.updateAdvertisement
  )
  .delete(advertisementController.deleteAdvertisement);

// Status update
router.patch(
  '/:id/status',
  validateRequest([
    body('is_active').isBoolean().withMessage('is_active must be a boolean value')
  ]),
  advertisementController.updateAdvertisementStatus
);

export default router; 