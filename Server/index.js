import express from 'express';
import dotenv, { configDotenv } from 'dotenv';
import cors from 'cors';
import CodeRouter from './src/Routes/Code.Route.js';
import connectDB from './src/DB/ConnectDB.js';
import UserRouter from './src/Routes/User.Routes.js';
import PaymentRoute from './src/Routes/Payment.Routes.js';
import { handleStripeWebhook } from './src/Controller/WebHook.Controller.js';

configDotenv();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// ==========================================
// 1. STRIPE WEBHOOK (MUST BE FIRST)
// ==========================================
// This needs to grab the raw body before express.json() converts it.
app.post(
  '/api/webhook',  
  express.raw({ type: 'application/json' }), 
  handleStripeWebhook
); 

// ==========================================
// 2. GLOBAL MIDDLEWARE
// ==========================================
app.use(express.json()); // Now this only runs for routes BELOW the webhook
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// ==========================================
// 3. API ROUTES
// ==========================================
app.use("/api/user", UserRouter);
app.use('/api/code', CodeRouter);
app.use('/api/subscribe', PaymentRoute);

app.get('/', (req, res) => {
    res.send("Server Started Successfully, you are in the homepage...");
});

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
});