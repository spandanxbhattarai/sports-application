import Sport from '../models/Sport.js';

class SportRepository {
  async create(sportData) {
    const sport = new Sport(sportData);
    return await sport.save();
  }

  async findById(id) {
    return await Sport.findById(id);
  }

  async findByName(name) {
    return await Sport.findOne({ name });
  }

  async update(id, updateData) {
    return await Sport.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Sport.findByIdAndDelete(id);
  }

  async findAll(query = {}, options = {}) {
    const { page = 1, limit = 10, sort = { created_at: -1 } } = options;
    const skip = (page - 1) * limit;

    const sports = await Sport.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Sport.countDocuments(query);

    return {
      sports,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  async findActive() {
    return await Sport.find({ is_active: true });
  }

  async updateStatus(id, isActive) {
    return await Sport.findByIdAndUpdate(
      id,
      { $set: { is_active: isActive } },
      { new: true }
    );
  }
}

export default new SportRepository(); 