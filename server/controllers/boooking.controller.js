import Booking from "../models/booking.model.js";
import { errorHandler } from "../utils/error.js";

export const book = async (req, res, next) => {
    const { name, phone, date, time, duration, totalAmount } = req.body;
    const newBooking = new Booking({ name,phone,date,time,duration, totalAmount});
    try {
        await newBooking.save();
        res.status(201).json("Booking done!!");
    } catch (error) {
        next(errorHandler(550, 'Internal Server Error'));
    }
  };
