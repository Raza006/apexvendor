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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    
    const email = session.customer_details?.email;
    const productId = session.metadata?.productId;
    const product = products.find((p) => p.id === productId);

    if (email && product) {
      // Generate link (Update this logic if you have real file hosting)
      const downloadLink = `${process.env.NEXT_PUBLIC_URL}/access/${productId}`;
      await sendOrderEmail(email, product.name, downloadLink);
    }
  }

  return NextResponse.json({ received: true });
}
