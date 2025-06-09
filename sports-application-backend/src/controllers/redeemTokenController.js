import * as redeemTokenService from '../services/redeemTokenService.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createRedeemToken = catchAsync(async (req, res) => {
  const token = await redeemTokenService.createRedeemToken({
    ...req.body,
    created_by: req.user._id
  });
  res.status(201).json({
    status: 'success',
    data: token
  });
});

export const getTokenById = catchAsync(async (req, res) => {
  const token = await redeemTokenService.getTokenById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: token
  });
});

export const getTokenByCode = catchAsync(async (req, res) => {
  const token = await redeemTokenService.getTokenByCode(req.params.code);
  res.status(200).json({
    status: 'success',
    data: token
  });
});

export const updateToken = catchAsync(async (req, res) => {
  // Validate token access
  await redeemTokenService.validateTokenAccess(
    req.params.id,
    req.user._id
  );

  const token = await redeemTokenService.updateToken(
    req.params.id,
    req.body
  );
  res.status(200).json({
    status: 'success',
    data: token
  });
});

export const deleteToken = catchAsync(async (req, res) => {
  // Validate token access
  await redeemTokenService.validateTokenAccess(
    req.params.id,
    req.user._id
  );

  await redeemTokenService.deleteToken(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const getAllTokens = catchAsync(async (req, res) => {
  const { page, limit, sort } = req.query;
  const tokens = await redeemTokenService.getAllTokens(
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...tokens
  });
});

export const getActiveTokens = catchAsync(async (req, res) => {
  const tokens = await redeemTokenService.getActiveTokens();
  res.status(200).json({
    status: 'success',
    data: tokens
  });
});

export const updateTokenStatus = catchAsync(async (req, res) => {
  // Validate token access
  await redeemTokenService.validateTokenAccess(
    req.params.id,
    req.user._id
  );

  const { is_active } = req.body;
  const token = await redeemTokenService.updateTokenStatus(
    req.params.id,
    is_active
  );
  res.status(200).json({
    status: 'success',
    data: token
  });
}); 