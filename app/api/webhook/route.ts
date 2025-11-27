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
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    
    const email = session.customer_details?.email;
    const productId = session.metadata?.productId;
    const product = products.find((p) => p.id === productId);

    if (email && product) {
      // Logic to generate or fetch the specific vendor link
      // For now, we simulate a link based on the product ID
      const downloadLink = `${process.env.NEXT_PUBLIC_URL}/access/${productId}`;

      await sendOrderEmail(email, product.name, downloadLink);
    }
  }

  return NextResponse.json({ received: true });
}

