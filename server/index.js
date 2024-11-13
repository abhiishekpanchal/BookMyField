import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import bookingRouter from './routes/booking.route.js';
import bookedRouter from './routes/booked.route.js';
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    orgin: [
        'http://localhost:3000',
        'http://localhost:5173',
    ]
}));  

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/server/booking', bookingRouter);
app.use('/server/booked', bookedRouter);

app.use('/server/payment', paymentRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!!');
});



