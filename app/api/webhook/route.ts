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

  // Handle PaymentIntent succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log("🎉 Payment Intent Succeeded!");
    const paymentIntent = event.data.object as any;
    console.log("Payment Intent ID:", paymentIntent.id);
    
    // Get email - should be in receipt_email since we pass it in confirmPayment
    const email = paymentIntent.receipt_email;
    const productId = paymentIntent.metadata?.productId;
    const product = products.find((p) => p.id === productId);
    
    console.log("📧 Email from receipt_email:", email);
    console.log("📦 Product ID:", productId);
    console.log("📦 Product found:", product?.name);
    
    // Try to get name from latest charge
    let customerName;
    if (paymentIntent.latest_charge) {
      try {
        const charge = await stripe.charges.retrieve(paymentIntent.latest_charge as string);
        customerName = charge.billing_details?.name;
        console.log("👤 Customer name:", customerName);
      } catch (err) {
        console.error("Error fetching charge:", err);
      }
    }

    if (email && product) {
      console.log("✅ All data present, sending email...");
      const downloadLink = `${process.env.NEXT_PUBLIC_URL}/access/${productId}`;
      await sendOrderEmail(
        email, 
        product.name, 
        downloadLink, 
        product.pdfFileName,
        customerName || undefined,
        product.vendorUrl
      );
      console.log("📧 Email sent successfully to:", email);
    } else {
       console.log("❌ Missing required data:");
       console.log("- Email:", email || "MISSING");
       console.log("- Product:", product?.name || "MISSING");
    }
  }

  // Keep this for backward compatibility if needed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    
    const email = session.customer_details?.email;
    const customerName = session.customer_details?.name || undefined;
    const productId = session.metadata?.productId;
    const product = products.find((p) => p.id === productId);

    if (email && product) {
      const downloadLink = `${process.env.NEXT_PUBLIC_URL}/access/${productId}`;
      await sendOrderEmail(
        email, 
        product.name, 
        downloadLink, 
        product.pdfFileName,
        customerName,
        product.vendorUrl
      );
    }
  }

  return NextResponse.json({ received: true });
}
