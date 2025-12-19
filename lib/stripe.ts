import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("🚨 STRIPE_SECRET_KEY is missing!");
  throw new Error("STRIPE_SECRET_KEY is missing. Please set it in your .env file.");
}

console.log("🔑 Stripe key detected:", process.env.STRIPE_SECRET_KEY.substring(0, 10) + "...");

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia" as any, 
  typescript: true,
});
