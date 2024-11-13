import express from 'express';
import { bookedDetails } from '../controllers/booked.controller.js';

const router = express.Router();

router.get('/bookedDetails', bookedDetails);

export default router;