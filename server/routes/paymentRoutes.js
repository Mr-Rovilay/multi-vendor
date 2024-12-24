import express from "express";
import { getStripeApiKey, processPayment } from "../controllers/paymentController.js";


const router = express.Router();

// Route for processing payment
router.post("/process", processPayment);

// Route for retrieving Stripe API key
router.get("/stripeapikey", getStripeApiKey);

export default router;
