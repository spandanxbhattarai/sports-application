import Tournament from '../models/Tournament.js';

export const createTournament = async (tournamentData) => {
  const tournament = new Tournament(tournamentData);
  return await tournament.save();
};

export const findTournamentById = async (id) => {
  return await Tournament.findById(id)
    .populate('organization_id', 'name domain');
};

export const updateTournament = async (id, updateData) => {
  return await Tournament.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate('organization_id', 'name domain');
};

export const deleteTournament = async (id) => {
  return await Tournament.findByIdAndDelete(id);
};

export const findAllTournaments = async (query = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { created_at: -1 } } = options;
  const skip = (page - 1) * limit;

  const tournaments = await Tournament.find(query)
    .populate('organization_id', 'name domain')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Tournament.countDocuments(query);

  return {
    tournaments,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    }
  };
};

export const findTournamentsByOrganization = async (organizationId, query = {}, options = {}) => {
  return await findAllTournaments(
    { organization_id: organizationId, ...query },
    options
  );
};

export const findActiveTournaments = async () => {
  const now = new Date();
  return await Tournament.find({
    is_active: true,
    start_date: { $lte: now },
    end_date: { $gte: now }
  }).populate('organization_id', 'name domain');
};

export const updateTournamentStatus = async (id, isActive) => {
  return await Tournament.findByIdAndUpdate(
    id,
    { $set: { is_active: isActive } },
    { new: true }
  ).populate('organization_id', 'name domain');
}; 