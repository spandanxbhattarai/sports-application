import organizationService from '../services/organizationService.js';
import { catchAsync } from '../utils/catchAsync.js';

class OrganizationController {
  createOrganization = catchAsync(async (req, res) => {
    const organization = await organizationService.createOrganization({
      ...req.body,
      owner_user_id: req.user._id
    });
    res.status(201).json({
      status: 'success',
      data: organization
    });
  });

  getOrganizationById = catchAsync(async (req, res) => {
    const organization = await organizationService.getOrganizationById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: organization
    });
  });

  getOrganizationByDomain = catchAsync(async (req, res) => {
    const organization = await organizationService.getOrganizationByDomain(req.params.domain);
    res.status(200).json({
      status: 'success',
      data: organization
    });
  });

  updateOrganization = catchAsync(async (req, res) => {
    // Validate organization access
    await organizationService.validateOrganizationAccess(req.params.id, req.user._id);

    const organization = await organizationService.updateOrganization(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: 'success',
      data: organization
    });
  });

  deleteOrganization = catchAsync(async (req, res) => {
    // Validate organization access
    await organizationService.validateOrganizationAccess(req.params.id, req.user._id);

    await organizationService.deleteOrganization(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

  getAllOrganizations = catchAsync(async (req, res) => {
    const { page, limit, sort } = req.query;
    const organizations = await organizationService.getAllOrganizations(
      {},
      { page, limit, sort }
    );
    res.status(200).json({
      status: 'success',
      ...organizations
    });
  });

  getOrganizationsByOwner = catchAsync(async (req, res) => {
    const organizations = await organizationService.getOrganizationsByOwner(req.user._id);
    res.status(200).json({
      status: 'success',
      data: organizations
    });
  });

  updateOrganizationPlan = catchAsync(async (req, res) => {
    // Validate organization access
    await organizationService.validateOrganizationAccess(req.params.id, req.user._id);

    const { plan_id, plan_expiry } = req.body;
    const organization = await organizationService.updateOrganizationPlan(
      req.params.id,
      plan_id,
      plan_expiry
    );
    res.status(200).json({
      status: 'success',
      data: organization
    });
  });
}

export default new OrganizationController(); 