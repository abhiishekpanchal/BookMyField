import Booking from "../models/booking.model.js";
import { errorHandler } from "../utils/error.js";

export const bookedDetails = async (req, res, next) => {
  try {
    const bookings = await Booking.find({}, 'date time duration').exec();

    const bookedSlots = bookings.map(booking => {
      return {
        date: booking.date.toISOString().split('T')[0],  
        time: booking.time,  
        duration: booking.duration
      };
    });

    res.status(200).json({
      success: true,
      data: bookedSlots
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
