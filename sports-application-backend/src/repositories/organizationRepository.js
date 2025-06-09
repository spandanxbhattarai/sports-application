import Organization from '../models/Organization.js';

class OrganizationRepository {
  async create(organizationData) {
    const organization = new Organization(organizationData);
    return await organization.save();
  }

  async findById(id) {
    return await Organization.findById(id)
      .populate('owner_user_id', 'name email')
      .populate('plan_id');
  }

  async findByDomain(domain) {
    return await Organization.findOne({ domain })
      .populate('owner_user_id', 'name email')
      .populate('plan_id');
  }

  async update(id, updateData) {
    return await Organization.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('owner_user_id', 'name email')
      .populate('plan_id');
  }

  async delete(id) {
    return await Organization.findByIdAndDelete(id);
  }

  async findAll(query = {}, options = {}) {
    const { page = 1, limit = 10, sort = { created_at: -1 } } = options;
    const skip = (page - 1) * limit;

    const organizations = await Organization.find(query)
      .populate('owner_user_id', 'name email')
      .populate('plan_id')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Organization.countDocuments(query);

    return {
      organizations,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  async findByOwnerId(ownerId) {
    return await Organization.find({ owner_user_id: ownerId })
      .populate('plan_id');
  }

  async updatePlan(id, planId, planExpiry) {
    return await Organization.findByIdAndUpdate(
      id,
      {
        $set: {
          plan_id: planId,
          plan_expiry: planExpiry
        }
      },
      { new: true, runValidators: true }
    );
  }
}

export default new OrganizationRepository(); 