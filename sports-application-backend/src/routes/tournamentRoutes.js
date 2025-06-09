import express from 'express';
import * as tournamentController from '../controllers/tournamentController.js';
// import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { createTournamentDto, updateTournamentDto } from '../dtos/tournamentDto.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/', tournamentController.getAllTournaments);
router.get('/active', tournamentController.getActiveTournaments);
router.get('/:id', tournamentController.getTournamentById);

// Protected routes (organization members)
// router.use(protect);

// Organization-specific routes
router.get('/organization/my-tournaments', tournamentController.getTournamentsByOrganization);

// Organization admin routes
// router.use(restrictTo('admin'));

router.post(
  '/',
  validateRequest(createTournamentDto),
  tournamentController.createTournament
);

router
  .route('/:id')
  .patch(
    validateRequest(updateTournamentDto),
    tournamentController.updateTournament
  )
  .delete(tournamentController.deleteTournament);

// Status update
router.patch(
  '/:id/status',
  validateRequest([
    body('is_active').isBoolean().withMessage('is_active must be a boolean value')
  ]),
  tournamentController.updateTournamentStatus
);

export default router; 