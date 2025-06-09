import * as bookingService from '../services/bookingService.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.createBooking({
    ...req.body,
    user_id: req.user._id
  });
  res.status(201).json({
    status: 'success',
    data: booking
  });
});

export const getBookingById = catchAsync(async (req, res) => {
  const booking = await bookingService.getBookingById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: booking
  });
});

export const updateBooking = catchAsync(async (req, res) => {
  // Validate booking access
  await bookingService.validateBookingAccess(
    req.params.id,
    req.user._id
  );

  const booking = await bookingService.updateBooking(
    req.params.id,
    req.body
  );
  res.status(200).json({
    status: 'success',
    data: booking
  });
});

export const deleteBooking = catchAsync(async (req, res) => {
  // Validate booking access
  await bookingService.validateBookingAccess(
    req.params.id,
    req.user._id
  );

  await bookingService.deleteBooking(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const getAllBookings = catchAsync(async (req, res) => {
  const { page, limit, sort } = req.query;
  const bookings = await bookingService.getAllBookings(
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getBookingsByUser = catchAsync(async (req, res) => {
  const { page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsByUser(
    req.user._id,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getBookingsByOrganization = catchAsync(async (req, res) => {
  const { page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsByOrganization(
    req.user.organization_id,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getActiveBookings = catchAsync(async (req, res) => {
  const bookings = await bookingService.getActiveBookings();
  res.status(200).json({
    status: 'success',
    data: bookings
  });
});

export const updateBookingStatus = catchAsync(async (req, res) => {
  // Validate booking access
  await bookingService.validateBookingAccess(
    req.params.id,
    req.user._id
  );

  const { is_active } = req.body;
  const booking = await bookingService.updateBookingStatus(
    req.params.id,
    is_active
  );
  res.status(200).json({
    status: 'success',
    data: booking
  });
});

export const getBookingsByDateRange = catchAsync(async (req, res) => {
  const { startDate, endDate, page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsByDateRange(
    startDate,
    endDate,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getBookingsBySport = catchAsync(async (req, res) => {
  const { sportId, page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsBySport(
    sportId,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getUpcomingBookings = catchAsync(async (req, res) => {
  const bookings = await bookingService.getUpcomingBookings(req.user._id);
  res.status(200).json({
    status: 'success',
    data: bookings
  });
});

export const getPastBookings = catchAsync(async (req, res) => {
  const bookings = await bookingService.getPastBookings(req.user._id);
  res.status(200).json({
    status: 'success',
    data: bookings
  });
});

export const getBookingsByStatus = catchAsync(async (req, res) => {
  const { status, page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsByStatus(
    status,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getBookingsByPaymentStatus = catchAsync(async (req, res) => {
  const { paymentStatus, page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsByPaymentStatus(
    paymentStatus,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getBookingsBySlot = catchAsync(async (req, res) => {
  const { slotId, page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsBySlot(
    slotId,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getBookingsByDate = catchAsync(async (req, res) => {
  const { date, page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsByDate(
    date,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getBookingsByUserAndDate = catchAsync(async (req, res) => {
  const { date, page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsByUserAndDate(
    req.user._id,
    date,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getBookingsByOrganizationAndDate = catchAsync(async (req, res) => {
  const { date, page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsByOrganizationAndDate(
    req.user.organization_id,
    date,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getBookingsByUserAndSport = catchAsync(async (req, res) => {
  const { sportId, page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsByUserAndSport(
    req.user._id,
    sportId,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
});

export const getBookingsByOrganizationAndSport = catchAsync(async (req, res) => {
  const { sportId, page, limit, sort } = req.query;
  const bookings = await bookingService.getBookingsByOrganizationAndSport(
    req.user.organization_id,
    sportId,
    {},
    { page, limit, sort }
  );
  res.status(200).json({
    status: 'success',
    ...bookings
  });
}); 