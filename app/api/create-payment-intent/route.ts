import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId } = body;

    console.log("🛒 Creating payment intent for product:", productId);

    const product = products.find((p) => p.id === productId);

    if (!product) {
      console.log("❌ Product not found:", productId);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    console.log("✅ Product found:", product.name, "Price:", product.price);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(product.price * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        productId: product.id,
        productName: product.name,
      },
    });
    
    console.log("💳 Payment intent created:", paymentIntent.id);
    console.log("📦 Metadata set:", paymentIntent.metadata);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("❌ Stripe PaymentIntent Error:", error);
    console.error("❌ Error details:", {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode,
    });
    return NextResponse.json(
      { 
        error: error.message || "Internal Server Error",
        details: error.type || "unknown_error"
      },
      { status: 500 }
    );
  }
}

