import Booking from '../models/Booking.js';

export const createBooking = async (bookingData) => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

export const findBookingById = async (id) => {
  return await Booking.findById(id)
    .populate('user_id', 'name email')
    .populate('organization_id', 'name domain')
    .populate('sport_id', 'name');
};

export const updateBooking = async (id, updateData) => {
  return await Booking.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  )
    .populate('user_id', 'name email')
    .populate('organization_id', 'name domain')
    .populate('sport_id', 'name');
};

export const deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

export const findAllBookings = async (query = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { created_at: -1 } } = options;
  const skip = (page - 1) * limit;

  const bookings = await Booking.find(query)
    .populate('user_id', 'name email')
    .populate('organization_id', 'name domain')
    .populate('sport_id', 'name')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Booking.countDocuments(query);

  return {
    bookings,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    }
  };
};

export const findBookingsByUser = async (userId, query = {}, options = {}) => {
  return await findAllBookings(
    { user_id: userId, ...query },
    options
  );
};

export const findBookingsByOrganization = async (organizationId, query = {}, options = {}) => {
  return await findAllBookings(
    { organization_id: organizationId, ...query },
    options
  );
};

export const findActiveBookings = async () => {
  const now = new Date();
  return await Booking.find({
    is_active: true,
    booking_date: { $gte: now }
  })
    .populate('user_id', 'name email')
    .populate('organization_id', 'name domain')
    .populate('sport_id', 'name');
};

export const updateBookingStatus = async (id, isActive) => {
  return await Booking.findByIdAndUpdate(
    id,
    { $set: { is_active: isActive } },
    { new: true }
  )
    .populate('user_id', 'name email')
    .populate('organization_id', 'name domain')
    .populate('sport_id', 'name');
};

export const findBookingsByDateRange = async (startDate, endDate, query = {}, options = {}) => {
  return await findAllBookings(
    {
      booking_date: {
        $gte: startDate,
        $lte: endDate
      },
      ...query
    },
    options
  );
};

export const findBookingsBySport = async (sportId, query = {}, options = {}) => {
  return await findAllBookings(
    { sport_id: sportId, ...query },
    options
  );
};

export const findUpcomingBookings = async (userId) => {
  const now = new Date();
  return await Booking.find({
    user_id: userId,
    booking_date: { $gte: now },
    is_active: true
  })
    .populate('user_id', 'name email')
    .populate('organization_id', 'name domain')
    .populate('sport_id', 'name')
    .sort({ booking_date: 1 });
};

export const findPastBookings = async (userId) => {
  const now = new Date();
  return await Booking.find({
    user_id: userId,
    booking_date: { $lt: now }
  })
    .populate('user_id', 'name email')
    .populate('organization_id', 'name domain')
    .populate('sport_id', 'name')
    .sort({ booking_date: -1 });
};

export const findBookingsByStatus = async (status, query = {}, options = {}) => {
  return await findAllBookings(
    { status, ...query },
    options
  );
};

export const findBookingsByPaymentStatus = async (paymentStatus, query = {}, options = {}) => {
  return await findAllBookings(
    { payment_status: paymentStatus, ...query },
    options
  );
};

export const findBookingsBySlot = async (slotId, query = {}, options = {}) => {
  return await findAllBookings(
    { slot_id: slotId, ...query },
    options
  );
};

export const findBookingsByDate = async (date, query = {}, options = {}) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await findAllBookings(
    {
      booking_date: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      ...query
    },
    options
  );
};

export const findBookingsByUserAndDate = async (userId, date, query = {}, options = {}) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await findAllBookings(
    {
      user_id: userId,
      booking_date: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      ...query
    },
    options
  );
};

export const findBookingsByOrganizationAndDate = async (organizationId, date, query = {}, options = {}) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await findAllBookings(
    {
      organization_id: organizationId,
      booking_date: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      ...query
    },
    options
  );
};

export const findBookingsByUserAndSport = async (userId, sportId, query = {}, options = {}) => {
  return await findAllBookings(
    {
      user_id: userId,
      sport_id: sportId,
      ...query
    },
    options
  );
};

export const findBookingsByOrganizationAndSport = async (organizationId, sportId, query = {}, options = {}) => {
  return await findAllBookings(
    {
      organization_id: organizationId,
      sport_id: sportId,
      ...query
    },
    options
  );
}; 