import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import organizationRoutes from './routes/organizationRoutes.js';
import sportRoutes from './routes/sportRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import advertisementRoutes from './routes/advertisementRoutes.js';
import tournamentRoutes from './routes/tournamentRoutes.js';
import redeemTokenRoutes from './routes/redeemTokenRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/advertisements', advertisementRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/redeem-tokens', redeemTokenRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 