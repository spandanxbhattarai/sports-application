import * as tournamentService from '../services/tournamentService.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createTournament = catchAsync(async (req, res) => {
  const tournament = await tournamentService.createTournament({
    ...req.body,
    organization_id: req.user.organization_id
  });
  res.status(201).json({
    status: 'success',
    data: tournament
  });
});

export const getTournamentById = catchAsync(async (req, res) => {
  const tournament = await tournamentService.getTournamentById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: tournament
  });
});

export const updateTournament = catchAsync(async (req, res) => {
  // Validate tournament access
  await tournamentService.validateTournamentAccess(
    req.params.id,
    req.user.organization_id
  );

  const tournament = await tournamentService.updateTournament(
    req.params.id,
    req.body
  );
  res.status(200).json({
    status: 'success',
    data: tournament
  });
});

export const deleteTournament = catchAsync(async (req, res) => {
  // Validate tournament access
  await tournamentService.validateTournamentAccess(
    req.params.id,
    req.user.organization_id
  );

  await tournamentService.deleteTournament(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const getAllTournaments = catchAsync(async (req, res) => {
  const { page, limit, sort } = req.query;
  const tournaments = await tournamentService.getAllTournaments(
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...tournaments
  });
});

export const getTournamentsByOrganization = catchAsync(async (req, res) => {
  const { page, limit, sort } = req.query;
  const tournaments = await tournamentService.getTournamentsByOrganization(
    req.user.organization_id,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...tournaments
  });
});

export const getActiveTournaments = catchAsync(async (req, res) => {
  const tournaments = await tournamentService.getActiveTournaments();
  res.status(200).json({
    status: 'success',
    data: tournaments
  });
});

export const updateTournamentStatus = catchAsync(async (req, res) => {
  // Validate tournament access
  await tournamentService.validateTournamentAccess(
    req.params.id,
    req.user.organization_id
  );

  const { is_active } = req.body;
  const tournament = await tournamentService.updateTournamentStatus(
    req.params.id,
    is_active
  );
  res.status(200).json({
    status: 'success',
    data: tournament
  });
}); 