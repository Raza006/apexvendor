import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, email } = body;

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // In a real app, you would create a Stripe Product & Price dynamically or fetch from DB.
    // For this simple setup, we create a checkout session with inline price data.
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email, // Pre-fill if provided, or let Stripe collect it
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}${product.image}`],
            },
            unit_amount: Math.round(product.price * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/products/${productId}`,
      metadata: {
        productId: product.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

