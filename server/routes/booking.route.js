import express from 'express';
import { book } from '../controllers/boooking.controller.js';

const router = express.Router();

router.post('/book', book);

export default router;