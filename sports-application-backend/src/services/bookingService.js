import * as bookingRepository from '../repositories/bookingRepository.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export const createBooking = async (bookingData) => {
  // Validate booking date
  if (new Date(bookingData.booking_date) < new Date()) {
    throw new BadRequestError('Booking date cannot be in the past');
  }

  return await bookingRepository.createBooking(bookingData);
};

export const getBookingById = async (id) => {
  const booking = await bookingRepository.findBookingById(id);
  if (!booking) {
    throw new NotFoundError('Booking not found');
  }
  return booking;
};

export const updateBooking = async (id, updateData) => {
  // Check if booking exists
  const booking = await bookingRepository.findBookingById(id);
  if (!booking) {
    throw new NotFoundError('Booking not found');
  }

  // Validate booking date if being updated
  if (updateData.booking_date) {
    if (new Date(updateData.booking_date) < new Date()) {
      throw new BadRequestError('Booking date cannot be in the past');
    }
  }

  return await bookingRepository.updateBooking(id, updateData);
};

export const deleteBooking = async (id) => {
  const booking = await bookingRepository.findBookingById(id);
  if (!booking) {
    throw new NotFoundError('Booking not found');
  }
  return await bookingRepository.deleteBooking(id);
};

export const getAllBookings = async (query = {}, options = {}) => {
  return await bookingRepository.findAllBookings(query, options);
};

export const getBookingsByUser = async (userId, query = {}, options = {}) => {
  return await bookingRepository.findBookingsByUser(userId, query, options);
};

export const getBookingsByOrganization = async (organizationId, query = {}, options = {}) => {
  return await bookingRepository.findBookingsByOrganization(organizationId, query, options);
};

export const getActiveBookings = async () => {
  return await bookingRepository.findActiveBookings();
};

export const updateBookingStatus = async (id, isActive) => {
  const booking = await bookingRepository.findBookingById(id);
  if (!booking) {
    throw new NotFoundError('Booking not found');
  }

  return await bookingRepository.updateBookingStatus(id, isActive);
};

export const getBookingsByDateRange = async (startDate, endDate, query = {}, options = {}) => {
  return await bookingRepository.findBookingsByDateRange(startDate, endDate, query, options);
};

export const getBookingsBySport = async (sportId, query = {}, options = {}) => {
  return await bookingRepository.findBookingsBySport(sportId, query, options);
};

export const getUpcomingBookings = async (userId) => {
  return await bookingRepository.findUpcomingBookings(userId);
};

export const getPastBookings = async (userId) => {
  return await bookingRepository.findPastBookings(userId);
};

export const getBookingsByStatus = async (status, query = {}, options = {}) => {
  return await bookingRepository.findBookingsByStatus(status, query, options);
};

export const getBookingsByPaymentStatus = async (paymentStatus, query = {}, options = {}) => {
  return await bookingRepository.findBookingsByPaymentStatus(paymentStatus, query, options);
};

export const getBookingsBySlot = async (slotId, query = {}, options = {}) => {
  return await bookingRepository.findBookingsBySlot(slotId, query, options);
};

export const getBookingsByDate = async (date, query = {}, options = {}) => {
  return await bookingRepository.findBookingsByDate(date, query, options);
};

export const getBookingsByUserAndDate = async (userId, date, query = {}, options = {}) => {
  return await bookingRepository.findBookingsByUserAndDate(userId, date, query, options);
};

export const getBookingsByOrganizationAndDate = async (organizationId, date, query = {}, options = {}) => {
  return await bookingRepository.findBookingsByOrganizationAndDate(organizationId, date, query, options);
};

export const getBookingsByUserAndSport = async (userId, sportId, query = {}, options = {}) => {
  return await bookingRepository.findBookingsByUserAndSport(userId, sportId, query, options);
};

export const getBookingsByOrganizationAndSport = async (organizationId, sportId, query = {}, options = {}) => {
  return await bookingRepository.findBookingsByOrganizationAndSport(organizationId, sportId, query, options);
};

export const validateBookingAccess = async (bookingId, userId) => {
  const booking = await bookingRepository.findBookingById(bookingId);
  if (!booking) {
    throw new NotFoundError('Booking not found');
  }

  if (booking.user_id.toString() !== userId) {
    throw new BadRequestError('You do not have access to this booking');
  }

  return booking;
}; 