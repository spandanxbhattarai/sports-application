import * as userService from '../services/userService.js';

export const register = async (req, res) => {
  try {
    // Log the entire request body for debugging
    console.log('Request body:', req.body);

    // Get location data from FormData format
    const latitude = req.body.location.latitude;
    const longitude = req.body.location.longitude;

    // Log the received location data for debugging
    console.log('Received location data:', { latitude, longitude });

    // Validate location data
    if (!latitude || !longitude) {
      return res.status(400).json({ 
        message: 'Location data is required. Please ensure location is enabled and try again.' 
      });
    }

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role || 'user',
      profile: {
        photoUrl: req.file ? req.file.path : null,
        address: req.body.address,
        location: {
          latitude: Number(latitude),
          longitude: Number(longitude)
        }
      }
    };

    // Log the final user data for debugging
    console.log('User data being saved:', userData);

    const user = await userService.registerUser(userData);
    res.status(201).json({
      message: 'Registration successful. Please check your email for verification.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, confirmationCode } = req.body;
    await userService.verifyEmail(email, confirmationCode);
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await userService.updateUserProfile(req.user._id, req.body);
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deactivateAccount = async (req, res) => {
  try {
    await userService.deactivateAccount(req.user._id);
    res.json({ message: 'Account deactivated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    await userService.deleteAccount(req.user._id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const activateAccount = async (req, res) => {
  try {
    await userService.activateAccount(req.user._id);
    res.json({ message: 'Account activated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    await userService.resendVerificationCode(email);
    res.json({ message: 'Verification code has been resent. Please check your email.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 