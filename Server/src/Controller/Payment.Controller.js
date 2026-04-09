import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controllers/Stripe.Controller.js
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { planType, secureHash } = req.body; 

    if (!secureHash) {
        return res.status(400).json({ error: "Secure Hash is required for redirection." });
    }

    const priceAmount = planType === 'yearly' ? 9999 : 999; 
    const interval = planType === 'yearly' ? 'year' : 'month';

    // Best practice: Use your env variable with a fallback
    const baseUrl = process.env.CLIENT_URL || "http://localhost:5173";
    
    const successUrl = `${baseUrl}/code-sage/${secureHash}/analyze?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/code-sage/${secureHash}/pricing`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription', 
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: planType === 'yearly' ? 'CodeSage Pro (Yearly)' : 'CodeSage Pro (Monthly)',
            description: 'Unlimited AI Analysis, File Uploads & History',
          },
          unit_amount: priceAmount, 
          recurring: { interval: interval }, 
        },
        quantity: 1,
      }],
      metadata: { 
        userId: userId.toString(), // CRITICAL: Ensure this is a string
        planType: planType 
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Session Error:", error);
    res.status(500).json({ error: error.message });
  }
};