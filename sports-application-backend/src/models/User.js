import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'organizationOwner', 'admin'],
    default: 'user'
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    default: null
  },
  phoneNumber: {
    type: String,
    required: true
  },
  profile: {
    type: {
      photoUrl: String,
      address: String,
      location: {
        latitude: Number,
        longitude: Number
      }
    },
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'blocked', 'deleted'],
    default: 'pending'
  },
  confirmationCode: String,
  confirmationValidity: Date,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the updated_at field before saving
userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

export default User; 