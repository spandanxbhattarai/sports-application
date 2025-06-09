import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { status: 'deleted' }, { new: true });
};

export const deactivateUser = async (id) => {
  return await User.findByIdAndUpdate(id, { status: 'blocked' }, { new: true });
};

export const activateUser = async (id) => {
  return await User.findByIdAndUpdate(id, { status: 'verified' }, { new: true });
};

export const verifyUser = async (email, confirmationCode) => {
  const user = await User.findOne({ 
    email, 
    confirmationCode,
    confirmationValidity: { $gt: new Date() }
  });

  if (user) {
    user.status = 'verified';
    user.confirmationCode = undefined;
    user.confirmationValidity = undefined;
    await user.save();
    return true;
  }
  return false;
};

export const updateConfirmationCode = async (email) => {
  const confirmationCode = uuidv4().slice(0, 6);
  const confirmationValidity = new Date(Date.now() + 24 * 60 * 60 * 1000); 

  const user = await User.findOneAndUpdate(
    { email, status: 'pending' },
    { 
      confirmationCode,
      confirmationValidity
    },
    { new: true }
  );

  return user;
}; 