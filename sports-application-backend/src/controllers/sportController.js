import sportService from '../services/sportService.js';
import { catchAsync } from '../utils/catchAsync.js';

class SportController {
  createSport = catchAsync(async (req, res) => {
    const sport = await sportService.createSport(req.body);
    res.status(201).json({
      status: 'success',
      data: sport
    });
  });

  getSportById = catchAsync(async (req, res) => {
    const sport = await sportService.getSportById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: sport
    });
  });

  updateSport = catchAsync(async (req, res) => {
    const sport = await sportService.updateSport(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: sport
    });
  });

  deleteSport = catchAsync(async (req, res) => {
    await sportService.deleteSport(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

  getAllSports = catchAsync(async (req, res) => {
    const { page, limit, sort } = req.query;
    const sports = await sportService.getAllSports(
      {},
      { page, limit, sort }
    );
    res.status(200).json({
      status: 'success',
      ...sports
    });
  });

  getActiveSports = catchAsync(async (req, res) => {
    const sports = await sportService.getActiveSports();
    res.status(200).json({
      status: 'success',
      data: sports
    });
  });

  updateSportStatus = catchAsync(async (req, res) => {
    const { is_active } = req.body;
    const sport = await sportService.updateSportStatus(req.params.id, is_active);
    res.status(200).json({
      status: 'success',
      data: sport
    });
  });
}

export default new SportController(); 