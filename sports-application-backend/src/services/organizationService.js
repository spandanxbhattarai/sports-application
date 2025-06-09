import organizationRepository from '../repositories/organizationRepository.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

class OrganizationService {
  async createOrganization(organizationData) {
    // Check if domain is already taken
    if (organizationData.domain) {
      const existingOrg = await organizationRepository.findByDomain(organizationData.domain);
      if (existingOrg) {
        throw new BadRequestError('Domain is already taken');
      }
    }

    return await organizationRepository.create(organizationData);
  }

  async getOrganizationById(id) {
    const organization = await organizationRepository.findById(id);
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }
    return organization;
  }

  async getOrganizationByDomain(domain) {
    const organization = await organizationRepository.findByDomain(domain);
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }
    return organization;
  }

  async updateOrganization(id, updateData) {
    // Check if organization exists
    const organization = await organizationRepository.findById(id);
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }

    // Check if domain is being updated and is already taken
    if (updateData.domain && updateData.domain !== organization.domain) {
      const existingOrg = await organizationRepository.findByDomain(updateData.domain);
      if (existingOrg) {
        throw new BadRequestError('Domain is already taken');
      }
    }

    return await organizationRepository.update(id, updateData);
  }

  async deleteOrganization(id) {
    const organization = await organizationRepository.findById(id);
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }
    return await organizationRepository.delete(id);
  }

  async getAllOrganizations(query = {}, options = {}) {
    return await organizationRepository.findAll(query, options);
  }

  async getOrganizationsByOwner(ownerId) {
    return await organizationRepository.findByOwnerId(ownerId);
  }

  async updateOrganizationPlan(id, planId, planExpiry) {
    const organization = await organizationRepository.findById(id);
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }

    return await organizationRepository.updatePlan(id, planId, planExpiry);
  }

  async validateOrganizationAccess(organizationId, userId) {
    const organization = await organizationRepository.findById(organizationId);
    if (!organization) {
      throw new NotFoundError('Organization not found');
    }

    if (organization.owner_user_id.toString() !== userId) {
      throw new BadRequestError('You do not have access to this organization');
    }

    return organization;
  }
}

export default new OrganizationService(); 