import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paymentIntentId, email, name } = body;

    console.log("📧 Updating payment intent:", paymentIntentId);
    console.log("📧 With email:", email);
    console.log("👤 With name:", name);

    // Update the payment intent with receipt_email AND metadata
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      receipt_email: email,
      metadata: {
        customer_email: email,
        customer_name: name || ''
      }
    });

    console.log("✅ Payment intent updated successfully with receipt_email");
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error updating payment intent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

