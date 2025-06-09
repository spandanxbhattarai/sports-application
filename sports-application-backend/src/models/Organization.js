import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
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
  owner_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  plan_expiry: {
    type: Date,
    required: true
  },
  domain: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  website: {
    background: String,
    textTitleColor: String,
    textDescriptionColor: String,
    navbarBackground: String,
    navbarTextColor: String
  },
  timeSlotGap: {
    type: Number,
    default: 30, // in minutes
    enum: [15, 30, 45, 60]
  },
  sports: [{
    sport_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sport',
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    schedule: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
      },
      start_time: {
        type: String,
        required: true
      },
      end_time: {
        type: String,
        required: true
      }
    }],
    max_participants: {
      type: Number,
      required: true
    }
  }],
  content: {
    hero: {
      title: String,
      subtitle: String,
      image_url: String
    },
    features: [{
      title: String,
      description: String,
      icon_url: String
    }],
    sponsors: [{
      name: String,
      logo_url: String
    }],
    about: {
      title: String,
      description: String,
      image_url: String
    },
    services: [{
      title: String,
      description: String,
      image_url: String
    }],
    members: [{
      name: String,
      position: String,
      image_url: String
    }]
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
organizationSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization; 