import express from 'express';
import { makePayment, validatePayment } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/pay', makePayment);
router.get('/getPay', validatePayment);

export default router;