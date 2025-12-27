import express from 'express';
import { createCheckoutSession } from '../Controller/Payment.Controller.js';
import authMiddleware from '../Middlewares/Auth.Middleware.js';
const PaymentRoute = express.Router();

PaymentRoute.post('/create-checkout-session',authMiddleware,createCheckoutSession);

export default PaymentRoute;