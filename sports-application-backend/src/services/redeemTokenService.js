import * as redeemTokenRepository from '../repositories/redeemTokenRepository.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export const createRedeemToken = async (tokenData) => {
  // Check if code already exists
  const existingToken = await redeemTokenRepository.findTokenByCode(tokenData.code);
  if (existingToken) {
    throw new BadRequestError('Token code already exists');
  }

  return await redeemTokenRepository.createRedeemToken(tokenData);
};

export const getTokenById = async (id) => {
  const token = await redeemTokenRepository.findTokenById(id);
  if (!token) {
    throw new NotFoundError('Token not found');
  }
  return token;
};

export const getTokenByCode = async (code) => {
  const token = await redeemTokenRepository.findTokenByCode(code);
  if (!token) {
    throw new NotFoundError('Token not found');
  }
  return token;
};

export const updateToken = async (id, updateData) => {
  // Check if token exists
  const token = await redeemTokenRepository.findTokenById(id);
  if (!token) {
    throw new NotFoundError('Token not found');
  }

  // Check if code is being updated and is already taken
  if (updateData.code && updateData.code !== token.code) {
    const existingToken = await redeemTokenRepository.findTokenByCode(updateData.code);
    if (existingToken) {
      throw new BadRequestError('Token code already exists');
    }
  }

  return await redeemTokenRepository.updateToken(id, updateData);
};

export const deleteToken = async (id) => {
  const token = await redeemTokenRepository.findTokenById(id);
  if (!token) {
    throw new NotFoundError('Token not found');
  }
  return await redeemTokenRepository.deleteToken(id);
};

export const getAllTokens = async (query = {}, options = {}) => {
  return await redeemTokenRepository.findAllTokens(query, options);
};

export const getActiveTokens = async () => {
  return await redeemTokenRepository.findActiveTokens();
};

export const updateTokenStatus = async (id, isActive) => {
  const token = await redeemTokenRepository.findTokenById(id);
  if (!token) {
    throw new NotFoundError('Token not found');
  }

  return await redeemTokenRepository.updateTokenStatus(id, isActive);
};

export const validateTokenAccess = async (tokenId, userId) => {
  const token = await redeemTokenRepository.findTokenById(tokenId);
  if (!token) {
    throw new NotFoundError('Token not found');
  }

  if (token.created_by.toString() !== userId) {
    throw new BadRequestError('You do not have access to this token');
  }

  return token;
}; 