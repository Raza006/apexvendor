import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { sendOrderEmail } from "@/lib/email-templates";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    // For Live mode, we MUST use the webhook secret
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // Fallback for local testing without CLI only if strictly not production
      if (process.env.NODE_ENV === 'production') {
         throw new Error("Webhook secret missing in production. Check your Vercel environment variables.");
      }
      console.warn("⚠️ WEBHOOK WARNING: Skipping signature verification (Dev mode only).");
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle raw PaymentIntent (Custom Element) OR Checkout Session (old embedded)
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as any;
    const productId = paymentIntent.metadata?.productId;
    const product = products.find((p) => p.id === productId);
    
    // PaymentIntent doesn't always have email directly on it if not collected via Link or customer object
    // But we can try to get receipt_email
    const email = paymentIntent.receipt_email || paymentIntent.charges?.data?.[0]?.billing_details?.email;

    if (email && product) {
      const downloadLink = `${process.env.NEXT_PUBLIC_URL}/access/${productId}`;
      await sendOrderEmail(email, product.name, downloadLink);
    } else {
       console.log("Payment succeeded but missing email or product ID in metadata");
    }
  }

  // Keep this for backward compatibility if needed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    
    const email = session.customer_details?.email;
    const productId = session.metadata?.productId;
    const product = products.find((p) => p.id === productId);

    if (email && product) {
      const downloadLink = `${process.env.NEXT_PUBLIC_URL}/access/${productId}`;
      await sendOrderEmail(email, product.name, downloadLink);
    }
  }

  return NextResponse.json({ received: true });
}
