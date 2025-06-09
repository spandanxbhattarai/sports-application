import express from 'express';
import sportController from '../controllers/sportController.js';
import { createSportDto, updateSportDto } from '../dtos/sportDto.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/', sportController.getAllSports);
router.get('/active', sportController.getActiveSports);
router.get('/:id', sportController.getSportById);

// Protected routes (admin only)
// router.use(protect);
// router.use(restrictTo('admin'));

router.post(
  '/',
  validateRequest(createSportDto),
  sportController.createSport
);

router
  .route('/:id')
  .patch(
    validateRequest(updateSportDto),
    sportController.updateSport
  )
  .delete(sportController.deleteSport);

// Status update
router.patch(
  '/:id/status',
  validateRequest([
    body('is_active').isBoolean().withMessage('is_active must be a boolean value')
  ]),
  sportController.updateSportStatus
);

export default router; 