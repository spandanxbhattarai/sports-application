import advertisementService from '../services/advertisementService.js';
import { catchAsync } from '../utils/catchAsync.js';

class AdvertisementController {
  createAdvertisement = catchAsync(async (req, res) => {
    const advertisement = await advertisementService.createAdvertisement({
      ...req.body,
      organization_id: req.user.organization_id
    });
    res.status(201).json({
      status: 'success',
      data: advertisement
    });
  });

  getAdvertisementById = catchAsync(async (req, res) => {
    const advertisement = await advertisementService.getAdvertisementById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: advertisement
    });
  });

  updateAdvertisement = catchAsync(async (req, res) => {
    // Validate advertisement access
    await advertisementService.validateAdvertisementAccess(
      req.params.id,
      req.user.organization_id
    );

    const advertisement = await advertisementService.updateAdvertisement(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: 'success',
      data: advertisement
    });
  });

  deleteAdvertisement = catchAsync(async (req, res) => {
    // Validate advertisement access
    await advertisementService.validateAdvertisementAccess(
      req.params.id,
      req.user.organization_id
    );

    await advertisementService.deleteAdvertisement(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

  getAllAdvertisements = catchAsync(async (req, res) => {
    const { page, limit, sort } = req.query;
    const advertisements = await advertisementService.getAllAdvertisements(
      {},
      { page, limit, sort }
    );
    res.status(200).json({
      status: 'success',
      ...advertisements
    });
  });

  getAdvertisementsByOrganization = catchAsync(async (req, res) => {
    const { page, limit, sort } = req.query;
    const advertisements = await advertisementService.getAdvertisementsByOrganization(
      req.user.organization_id,
      {},
      { page, limit, sort }
    );
    res.status(200).json({
      status: 'success',
      ...advertisements
    });
  });

  getActiveAdvertisements = catchAsync(async (req, res) => {
    const advertisements = await advertisementService.getActiveAdvertisements();
    res.status(200).json({
      status: 'success',
      data: advertisements
    });
  });

  updateAdvertisementStatus = catchAsync(async (req, res) => {
    // Validate advertisement access
    await advertisementService.validateAdvertisementAccess(
      req.params.id,
      req.user.organization_id
    );

    const { is_active } = req.body;
    const advertisement = await advertisementService.updateAdvertisementStatus(
      req.params.id,
      is_active
    );
    res.status(200).json({
      status: 'success',
      data: advertisement
    });
  });
}

export default new AdvertisementController(); 