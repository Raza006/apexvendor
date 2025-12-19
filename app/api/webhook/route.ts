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
    console.log("🎉 Payment Intent Succeeded!");
    const paymentIntent = event.data.object as any;
    console.log("Payment Intent ID:", paymentIntent.id);
    console.log("Metadata:", paymentIntent.metadata);
    
    const productId = paymentIntent.metadata?.productId;
    const product = products.find((p) => p.id === productId);
    
    console.log("Product ID:", productId);
    console.log("Product found:", product?.name);
    
    // Get the latest charge to extract billing details
    let email = paymentIntent.receipt_email;
    let customerName;
    
    // If no receipt_email, we need to fetch the charge with expanded payment_method
    if (!email && paymentIntent.latest_charge) {
      console.log("Fetching charge details for email...");
      try {
        const charge = await stripe.charges.retrieve(paymentIntent.latest_charge as string, {
          expand: ['payment_method'],
        });
        email = charge.billing_details?.email || (charge.payment_method as any)?.billing_details?.email;
        customerName = charge.billing_details?.name || (charge.payment_method as any)?.billing_details?.name;
        console.log("Retrieved from charge:", { email, customerName });
      } catch (err) {
        console.error("Error fetching charge:", err);
      }
    }
    
    console.log("Final email found:", email);
    console.log("Final customer name:", customerName);

    if (email && product) {
      console.log("✅ Sending email to:", email);
      const downloadLink = `${process.env.NEXT_PUBLIC_URL}/access/${productId}`;
      await sendOrderEmail(
        email, 
        product.name, 
        downloadLink, 
        product.pdfFileName,
        customerName,
        product.vendorUrl
      );
      console.log("📧 Email sent successfully!");
    } else {
       console.log("❌ Payment succeeded but missing data:");
       console.log("- Email:", email ? "✅" : "❌");
       console.log("- Product:", product ? "✅" : "❌");
       console.log("- Product ID in metadata:", productId ? "✅" : "❌");
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
