import stripe from "stripe";

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// Process payment
export const processPayment = async (req, res) => {
  try {
    const myPayment = await stripeInstance.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Multi vendor",
      },
    });

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Stripe API Key
export const getStripeApiKey = async (req, res) => {
  try {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
