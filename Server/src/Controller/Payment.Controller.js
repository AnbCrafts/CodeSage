import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user._id; 
    
    // 1. Destructure secureHash from the request body
    const { planType, secureHash } = req.body; 

    // Validation to ensure we don't build a broken URL
    if (!secureHash) {
        return res.status(400).json({ error: "Secure Hash is required for redirection." });
    }

    let priceAmount = 999;   
    let interval = 'month'; 

    if (planType === 'yearly') {
        priceAmount = 9999; 
        interval = 'year';
    }

    // 2. Construct dynamic URLs using CLIENT_URL + secureHash
    // CLIENT_URL should be "http://localhost:5173" (no trailing slash)
    const baseUrl = process.env.CLIENT_URL;
    
    const successUrl = `${"http://localhost:5173"}/code-sage/${secureHash}/analyze`;
    const cancelUrl = `${"http://localhost:5173"}/code-sage/${secureHash}/pricing`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription', 
      line_items: [  
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planType === 'yearly' ? 'CodeSage Pro (Yearly)' : 'CodeSage Pro (Monthly)',
              description: 'Unlimited AI Analysis & History',
            },
            unit_amount: priceAmount, 
            recurring: { interval: interval }, 
          },
          quantity: 1,
        },
      ],
      metadata: { 
        userId: userId.toString(),
        planType: planType 
      },
      // 3. Use the dynamic URLs
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
}; 