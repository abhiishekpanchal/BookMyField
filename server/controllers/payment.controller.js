// import Razorpay from "razorpay"
// import { errorHandler } from "../utils/error.js";
// import crypto from 'crypto'

// export const makePayment = async (req, res, next) => {
//     const razorpay = new Razorpay({
//         key_id: process.env.RAZORPAY_KEY_ID,
//         key_secret: process.env.RAZORPAY_SECRET,
//     });

//     const options = req.body;

//     try {
//         const res = await razorpay.orders.create(options);

//         res.json({
//             order_id: res.id,
//             currency: res.currency,
//             amount: res.amount
//         })
//     } catch (error) {
//         console.log(error);
//         next(errorHandler(500, "Internal Server Error"));
//     }
// }

// export const validatePayment = async (req, res, next) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
//     sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    
//     const digest = sha.digest("hex");
//     if(digest !== razorpay_signature) {
//         return next(errorHandler(400, "Transaction is not legit!!"));
//     }

//     res.json({
//         msg: "success",
//         orderId: razorpay_order_id,
//         paymentId: razorpay_payment_id,
//     }) 
// }