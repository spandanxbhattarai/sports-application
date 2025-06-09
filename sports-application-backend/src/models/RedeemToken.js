import mongoose from 'mongoose';

const redeemTokenSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  discount_amount: {
    type: Number,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
redeemTokenSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const RedeemToken = mongoose.model('RedeemToken', redeemTokenSchema);

export default RedeemToken; 