import express from 'express';
import organizationController from '../controllers/organizationController.js';
import { createOrganizationDto, updateOrganizationDto } from '../dtos/organizationDto.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { body } from 'express-validator';

const router = express.Router();


// Public routes (authenticated users)
router.get('/', organizationController.getAllOrganizations);
router.get('/domain/:domain', organizationController.getOrganizationByDomain);
router.get('/my-organizations', organizationController.getOrganizationsByOwner);

// Organization owner routes
router.post(
  '/',
  validateRequest(createOrganizationDto),
  organizationController.createOrganization
);

router
  .route('/:id')
  .get(organizationController.getOrganizationById)
  .patch(
    validateRequest(updateOrganizationDto),
    organizationController.updateOrganization
  )
  .delete(organizationController.deleteOrganization);

// Plan management
router.patch(
  '/:id/plan',
  validateRequest([
    body('plan_id').isMongoId().withMessage('Invalid plan ID'),
    body('plan_expiry').isISO8601().withMessage('Invalid plan expiry date')
  ]),
  organizationController.updateOrganizationPlan
);

export default router; 