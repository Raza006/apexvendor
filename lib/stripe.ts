import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing. Please set it in your .env file.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Uses the latest API version compatible with your dashboard settings.
  // When going live, ensure your Stripe Dashboard API version matches or exceeds this.
  apiVersion: "2024-12-18.acacia" as any, 
  typescript: true,
});
