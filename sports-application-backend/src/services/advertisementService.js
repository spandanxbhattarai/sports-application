import advertisementRepository from '../repositories/advertisementRepository.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

class AdvertisementService {
  async createAdvertisement(advertisementData) {
    // Validate dates
    if (new Date(advertisementData.start_date) >= new Date(advertisementData.end_date)) {
      throw new BadRequestError('End date must be after start date');
    }

    return await advertisementRepository.create(advertisementData);
  }

  async getAdvertisementById(id) {
    const advertisement = await advertisementRepository.findById(id);
    if (!advertisement) {
      throw new NotFoundError('Advertisement not found');
    }
    return advertisement;
  }

  async updateAdvertisement(id, updateData) {
    // Check if advertisement exists
    const advertisement = await advertisementRepository.findById(id);
    if (!advertisement) {
      throw new NotFoundError('Advertisement not found');
    }

    // Validate dates if being updated
    if (updateData.start_date || updateData.end_date) {
      const startDate = updateData.start_date || advertisement.start_date;
      const endDate = updateData.end_date || advertisement.end_date;
      
      if (new Date(startDate) >= new Date(endDate)) {
        throw new BadRequestError('End date must be after start date');
      }
    }

    return await advertisementRepository.update(id, updateData);
  }

  async deleteAdvertisement(id) {
    const advertisement = await advertisementRepository.findById(id);
    if (!advertisement) {
      throw new NotFoundError('Advertisement not found');
    }
    return await advertisementRepository.delete(id);
  }

  async getAllAdvertisements(query = {}, options = {}) {
    return await advertisementRepository.findAll(query, options);
  }

  async getAdvertisementsByOrganization(organizationId, query = {}, options = {}) {
    return await advertisementRepository.findByOrganization(organizationId, query, options);
  }

  async getActiveAdvertisements() {
    return await advertisementRepository.findActive();
  }

  async updateAdvertisementStatus(id, isActive) {
    const advertisement = await advertisementRepository.findById(id);
    if (!advertisement) {
      throw new NotFoundError('Advertisement not found');
    }

    return await advertisementRepository.updateStatus(id, isActive);
  }

  async validateAdvertisementAccess(advertisementId, organizationId) {
    const advertisement = await advertisementRepository.findById(advertisementId);
    if (!advertisement) {
      throw new NotFoundError('Advertisement not found');
    }

    if (advertisement.organization_id.toString() !== organizationId) {
      throw new BadRequestError('You do not have access to this advertisement');
    }

    return advertisement;
  }
}

export default new AdvertisementService(); 