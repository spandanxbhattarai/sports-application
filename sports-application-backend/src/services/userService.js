import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import * as userRepository from '../repositories/userRepository.js';
import { sendVerificationEmail } from './emailService.js';
import { uploadToCloudinary } from './fileUploadService.js';

export const registerUser = async (userData) => {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const confirmationCode = uuidv4().slice(0, 6);
  const confirmationValidity = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  // If there's a file path, upload to Cloudinary
  let photoUrl = null;
  if (userData.profile.photoUrl) {
    photoUrl = await uploadToCloudinary(userData.profile.photoUrl);
  }

  const user = await userRepository.createUser({
    name: userData.name,
    email: userData.email,
    passwordHash: hashedPassword,
    phoneNumber: userData.phoneNumber,
    role: userData.role,
    profile: {
      photoUrl,
      address: userData.profile.address,
      location: userData.profile.location
    },
    confirmationCode,
    confirmationValidity
  });

  // Send email asynchronously without waiting
  sendVerificationEmail(user.email, user.name, confirmationCode)
    .catch(error => console.error('Background email sending failed:', error));

  return user;
};

export const loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.status === 'blocked' || user.status === 'deleted') {
    throw new Error('Account is blocked or deleted');
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { user, token };
};

export const verifyEmail = async (email, confirmationCode) => {
  const isVerified = await userRepository.verifyUser(email, confirmationCode);
  if (!isVerified) {
    throw new Error('Invalid or expired confirmation code');
  }
  return true;
};

export const updateUserProfile = async (userId, updateData) => {
  if (updateData.password) {
    updateData.passwordHash = await bcrypt.hash(updateData.password, 10);
    delete updateData.password;
  }
  return await userRepository.updateUser(userId, updateData);
};

export const deactivateAccount = async (userId) => {
  return await userRepository.deactivateUser(userId);
};

export const deleteAccount = async (userId) => {
  return await userRepository.deleteUser(userId);
};

export const activateAccount = async (userId) => {
  return await userRepository.activateUser(userId);
};

export const resendVerificationCode = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  
  if (!user) {
    throw new Error('User not found');
  }

  if (user.status === 'verified') {
    throw new Error('Email is already verified');
  }

  const updatedUser = await userRepository.updateConfirmationCode(email);
  if (!updatedUser) {
    throw new Error('Failed to update verification code');
  }

  // Send email asynchronously without waiting
  sendVerificationEmail(updatedUser.email, updatedUser.name, updatedUser.confirmationCode)
    .catch(error => console.error('Background email sending failed:', error));

  return true;
}; 