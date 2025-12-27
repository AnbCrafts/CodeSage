import Stripe from 'stripe';
import UserModel from '../Models/User.Model.js';
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Stripe requires the RAW body to verify signature
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;

    await UserModel.findByIdAndUpdate(userId, { isPro: true });
    // console.log(`User ${userId} upgraded.`);
  }

  res.send();
};