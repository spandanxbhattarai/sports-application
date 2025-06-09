import sportRepository from '../repositories/sportRepository.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

class SportService {
  async createSport(sportData) {
    // Check if sport name already exists
    const existingSport = await sportRepository.findByName(sportData.name);
    if (existingSport) {
      throw new BadRequestError('Sport with this name already exists');
    }

    return await sportRepository.create(sportData);
  }

  async getSportById(id) {
    const sport = await sportRepository.findById(id);
    if (!sport) {
      throw new NotFoundError('Sport not found');
    }
    return sport;
  }

  async updateSport(id, updateData) {
    // Check if sport exists
    const sport = await sportRepository.findById(id);
    if (!sport) {
      throw new NotFoundError('Sport not found');
    }

    // Check if name is being updated and is already taken
    if (updateData.name && updateData.name !== sport.name) {
      const existingSport = await sportRepository.findByName(updateData.name);
      if (existingSport) {
        throw new BadRequestError('Sport with this name already exists');
      }
    }

    return await sportRepository.update(id, updateData);
  }

  async deleteSport(id) {
    const sport = await sportRepository.findById(id);
    if (!sport) {
      throw new NotFoundError('Sport not found');
    }
    return await sportRepository.delete(id);
  }

  async getAllSports(query = {}, options = {}) {
    return await sportRepository.findAll(query, options);
  }

  async getActiveSports() {
    return await sportRepository.findActive();
  }

  async updateSportStatus(id, isActive) {
    const sport = await sportRepository.findById(id);
    if (!sport) {
      throw new NotFoundError('Sport not found');
    }

    return await sportRepository.updateStatus(id, isActive);
  }
}

export default new SportService(); 