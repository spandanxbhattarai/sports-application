import * as tournamentRepository from '../repositories/tournamentRepository.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export const createTournament = async (tournamentData) => {
  // Validate dates
  if (new Date(tournamentData.start_date) >= new Date(tournamentData.end_date)) {
    throw new BadRequestError('End date must be after start date');
  }

  return await tournamentRepository.createTournament(tournamentData);
};

export const getTournamentById = async (id) => {
  const tournament = await tournamentRepository.findTournamentById(id);
  if (!tournament) {
    throw new NotFoundError('Tournament not found');
  }
  return tournament;
};

export const updateTournament = async (id, updateData) => {
  // Check if tournament exists
  const tournament = await tournamentRepository.findTournamentById(id);
  if (!tournament) {
    throw new NotFoundError('Tournament not found');
  }

  // Validate dates if being updated
  if (updateData.start_date || updateData.end_date) {
    const startDate = updateData.start_date || tournament.start_date;
    const endDate = updateData.end_date || tournament.end_date;
    
    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestError('End date must be after start date');
    }
  }

  return await tournamentRepository.updateTournament(id, updateData);
};

export const deleteTournament = async (id) => {
  const tournament = await tournamentRepository.findTournamentById(id);
  if (!tournament) {
    throw new NotFoundError('Tournament not found');
  }
  return await tournamentRepository.deleteTournament(id);
};

export const getAllTournaments = async (query = {}, options = {}) => {
  return await tournamentRepository.findAllTournaments(query, options);
};

export const getTournamentsByOrganization = async (organizationId, query = {}, options = {}) => {
  return await tournamentRepository.findTournamentsByOrganization(organizationId, query, options);
};

export const getActiveTournaments = async () => {
  return await tournamentRepository.findActiveTournaments();
};

export const updateTournamentStatus = async (id, isActive) => {
  const tournament = await tournamentRepository.findTournamentById(id);
  if (!tournament) {
    throw new NotFoundError('Tournament not found');
  }

  return await tournamentRepository.updateTournamentStatus(id, isActive);
};

export const validateTournamentAccess = async (tournamentId, organizationId) => {
  const tournament = await tournamentRepository.findTournamentById(tournamentId);
  if (!tournament) {
    throw new NotFoundError('Tournament not found');
  }

  if (tournament.organization_id.toString() !== organizationId) {
    throw new BadRequestError('You do not have access to this tournament');
  }

  return tournament;
}; 