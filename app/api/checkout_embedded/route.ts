import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId } = body;

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    let imageUrl = product.image.startsWith('http') 
      ? product.image 
      : `${baseUrl}${product.image}`;
    
    // Encode URL to handle spaces in filenames
    imageUrl = encodeURI(imageUrl);

    // Validate URL format roughly to prevent crash
    const images = [];
    try {
      new URL(imageUrl); // Will throw if invalid
      // Stripe doesn't like localhost images usually, but we'll include it if valid structure.
      // If it fails on Stripe side due to accessibility, the product will just have no image.
      // But 'url_invalid' error is usually syntax.
      images.push(imageUrl);
    } catch (e) {
      console.warn("Invalid image URL skipped:", imageUrl);
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: images.length > 0 ? images : undefined,
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        productId: product.id,
      },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error: any) {
    console.error("Stripe Embedded Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
