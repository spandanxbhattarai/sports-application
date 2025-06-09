import RedeemToken from '../models/RedeemToken.js';

export const createRedeemToken = async (tokenData) => {
  const token = new RedeemToken(tokenData);
  return await token.save();
};

export const findTokenById = async (id) => {
  return await RedeemToken.findById(id)
    .populate('created_by', 'name email');
};

export const findTokenByCode = async (code) => {
  return await RedeemToken.findOne({ code })
    .populate('created_by', 'name email');
};

export const updateToken = async (id, updateData) => {
  return await RedeemToken.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate('created_by', 'name email');
};

export const deleteToken = async (id) => {
  return await RedeemToken.findByIdAndDelete(id);
};

export const findAllTokens = async (query = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { created_at: -1 } } = options;
  const skip = (page - 1) * limit;

  const tokens = await RedeemToken.find(query)
    .populate('created_by', 'name email')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await RedeemToken.countDocuments(query);

  return {
    tokens,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    }
  };
};

export const findActiveTokens = async () => {
  return await RedeemToken.find({ is_active: true })
    .populate('created_by', 'name email');
};

export const updateTokenStatus = async (id, isActive) => {
  return await RedeemToken.findByIdAndUpdate(
    id,
    { $set: { is_active: isActive } },
    { new: true }
  ).populate('created_by', 'name email');
}; 