import express from 'express';
import * as redeemTokenController from '../controllers/redeemTokenController.js';
// import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { createRedeemTokenDto, updateRedeemTokenDto } from '../dtos/redeemTokenDto.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/', redeemTokenController.getAllTokens);
router.get('/active', redeemTokenController.getActiveTokens);
router.get('/code/:code', redeemTokenController.getTokenByCode);
router.get('/:id', redeemTokenController.getTokenById);

// Protected routes (admin only)
// router.use(protect);
// router.use(restrictTo('admin'));

router.post(
  '/',
  validateRequest(createRedeemTokenDto),
  redeemTokenController.createRedeemToken
);

router
  .route('/:id')
  .patch(
    validateRequest(updateRedeemTokenDto),
    redeemTokenController.updateToken
  )
  .delete(redeemTokenController.deleteToken);

// Status update
router.patch(
  '/:id/status',
  validateRequest([
    body('is_active').isBoolean().withMessage('is_active must be a boolean value')
  ]),
  redeemTokenController.updateTokenStatus
);

export default router; 