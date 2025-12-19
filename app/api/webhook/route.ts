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
    
    // Log EVERYTHING to debug
    console.log("=== FULL PAYMENT INTENT DATA ===");
    console.log("receipt_email:", paymentIntent.receipt_email);
    console.log("charges:", JSON.stringify(paymentIntent.charges));
    console.log("latest_charge:", paymentIntent.latest_charge);
    console.log("payment_method:", paymentIntent.payment_method);
    console.log("customer:", paymentIntent.customer);
    
    const productId = paymentIntent.metadata?.productId;
    const product = products.find((p) => p.id === productId);
    
    console.log("Product ID:", productId);
    console.log("Product found:", product?.name);
    
    // Get email from billing details
    let email = paymentIntent.receipt_email;
    let customerName;
    
    // Try to get from charges array first
    if (!email && paymentIntent.charges?.data?.[0]) {
      const charge = paymentIntent.charges.data[0];
      console.log("Charge billing_details:", JSON.stringify(charge.billing_details));
      email = charge.billing_details?.email;
      customerName = charge.billing_details?.name;
      
      // If still no email, try to fetch the payment method
      if (!email && charge.payment_method) {
        console.log("Fetching payment method for billing details...");
        try {
          const paymentMethod = await stripe.paymentMethods.retrieve(charge.payment_method as string);
          console.log("Payment method billing_details:", JSON.stringify(paymentMethod.billing_details));
          email = paymentMethod.billing_details?.email;
          customerName = customerName || paymentMethod.billing_details?.name;
          console.log("Retrieved from payment method:", { email, customerName });
        } catch (err) {
          console.error("Error fetching payment method:", err);
        }
      }
    } else if (!email && paymentIntent.payment_method) {
      // No charges array, try payment method directly
      console.log("No charges array, fetching payment method directly...");
      try {
        const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method as string);
        console.log("Payment method billing_details:", JSON.stringify(paymentMethod.billing_details));
        email = paymentMethod.billing_details?.email;
        customerName = paymentMethod.billing_details?.name;
        console.log("Retrieved from payment method:", { email, customerName });
      } catch (err) {
        console.error("Error fetching payment method:", err);
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
