import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { sendOrderEmail } from "@/lib/email-templates";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  console.log("🔔 WEBHOOK CALLED!");
  
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

  console.log("📨 Webhook Event Type:", event.type);
  console.log("📨 Webhook Event ID:", event.id);

  // Handle PaymentIntent succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log("🎉 Payment Intent Succeeded!");
    const paymentIntent = event.data.object as any;
    console.log("Payment Intent ID:", paymentIntent.id);
    
    // Get email - try ALL possible sources
    let email = paymentIntent.receipt_email;
    let customerName;
    
    console.log("📧 Step 1 - receipt_email:", email || "NOT FOUND");
    
    // ALWAYS try to get from latest charge billing_details
    if (paymentIntent.latest_charge) {
      try {
        const charge = await stripe.charges.retrieve(paymentIntent.latest_charge as string, {
          expand: ['payment_method']
        });
        console.log("📧 Step 2 - Charge retrieved successfully");
        console.log("📧 Charge billing_details:", JSON.stringify(charge.billing_details));
        
        if (!email && charge.billing_details?.email) {
          email = charge.billing_details.email;
          console.log("📧 Got email from charge billing_details:", email);
        }
        
        if (charge.billing_details?.name) {
          customerName = charge.billing_details.name;
          console.log("👤 Got name from charge billing_details:", customerName);
        }
      } catch (err) {
        console.error("❌ Error fetching charge:", err);
      }
    }
    
    const productId = paymentIntent.metadata?.productId;
    const product = products.find((p) => p.id === productId);
    
    console.log("📧 FINAL Email:", email || "STILL NOT FOUND");
    console.log("📦 Product ID:", productId);
    console.log("📦 Product found:", product?.name);
    console.log("👤 FINAL Customer name:", customerName || "NOT FOUND")

    // TEMPORARY: Force email to raza.ad2006@gmail.com for testing
    const testEmail = "raza.ad2006@gmail.com";
    console.log("🧪 TEST MODE: Forcing email to", testEmail);
    
    if (product) {
      console.log("✅ Product found, sending test email...");
      const downloadLink = `${process.env.NEXT_PUBLIC_URL}/access/${productId}`;
      try {
        await sendOrderEmail(
          testEmail,  // Using hardcoded email for testing
          product.name, 
          downloadLink, 
          product.pdfFileName,
          customerName || "Test Customer",
          product.vendorUrl
        );
        console.log("📧 Test email sent successfully to:", testEmail);
      } catch (emailError: any) {
        console.error("❌ Email sending failed:", emailError);
        console.error("Email error details:", emailError?.message || emailError);
        console.error("Full error object:", JSON.stringify(emailError, null, 2));
      }
    } else {
       console.log("❌ Product not found!");
       console.log("- Product ID from metadata:", productId);
       console.log("- Available products:", products.map(p => p.id).join(", "));
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
      try {
        await sendOrderEmail(
          email, 
          product.name, 
          downloadLink, 
          product.pdfFileName,
          customerName,
          product.vendorUrl
        );
        console.log("📧 Email sent successfully (checkout.session.completed)");
      } catch (emailError: any) {
        console.error("❌ Email sending failed (checkout.session.completed):", emailError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
