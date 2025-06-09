import Advertisement from '../models/Advertisement.js';

class AdvertisementRepository {
  async create(advertisementData) {
    const advertisement = new Advertisement(advertisementData);
    return await advertisement.save();
  }

  async findById(id) {
    return await Advertisement.findById(id)
      .populate('organization_id', 'name domain');
  }

  async update(id, updateData) {
    return await Advertisement.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('organization_id', 'name domain');
  }

  async delete(id) {
    return await Advertisement.findByIdAndDelete(id);
  }

  async findAll(query = {}, options = {}) {
    const { page = 1, limit = 10, sort = { created_at: -1 } } = options;
    const skip = (page - 1) * limit;

    const advertisements = await Advertisement.find(query)
      .populate('organization_id', 'name domain')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Advertisement.countDocuments(query);

    return {
      advertisements,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  async findByOrganization(organizationId, query = {}, options = {}) {
    return await this.findAll(
      { organization_id: organizationId, ...query },
      options
    );
  }

  async findActive() {
    const now = new Date();
    return await Advertisement.find({
      is_active: true,
      start_date: { $lte: now },
      end_date: { $gte: now }
    }).populate('organization_id', 'name domain');
  }

  async updateStatus(id, isActive) {
    return await Advertisement.findByIdAndUpdate(
      id,
      { $set: { is_active: isActive } },
      { new: true }
    ).populate('organization_id', 'name domain');
  }
}

export default new AdvertisementRepository(); 