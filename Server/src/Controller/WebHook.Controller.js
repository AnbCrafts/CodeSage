import Stripe from 'stripe';
import UserModel from '../Models/User.Model.js';
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controllers/Webhook.Controller.js
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // req.body must be the RAW buffer from express.raw()
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`❌ Webhook Signature Verification Failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata?.userId;

    console.log(`🔔 Webhook received for Session: ${session.id}`);

    if (!userId) {
      console.error("❌ Critical Error: No userId found in session metadata.");
      return res.status(400).send("No userId in metadata");
    }

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId, 
        { $set: { isPro: true } }, // Use $set for explicit update
        { new: true } 
      );

      if (updatedUser) {
        console.log(`✅ Success: ${updatedUser.username} (ID: ${userId}) is now Pro.`);
      } else {
        console.error(`❌ Database Error: User with ID ${userId} not found in DB.`);
      }
    } catch (dbError) {
      console.error("❌ Database Update Exception:", dbError);
    }
  }

  // Always return 200 to Stripe
  res.status(200).send({ received: true });
};