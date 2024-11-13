import mongoose, { mongo } from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;