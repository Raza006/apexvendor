"use client";

import { Product } from "@/lib/products";
import { Loader2, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface InlineCheckoutProps {
  product: Product;
}

export function InlineCheckout({ product }: InlineCheckoutProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create a Checkout Session as soon as the component mounts
    setLoading(true);
    fetch("/api/checkout_embedded", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error creating checkout session:", err);
        setLoading(false);
      });
  }, [product.id]);

  if (loading && !clientSecret) {
    return (
      <div className="bg-card border border-border rounded-2xl p-12 shadow-lg flex flex-col items-center justify-center text-neutral-500 min-h-[400px]">
        <Loader2 className="animate-spin mb-4 text-blue-500" size={32} />
        <p>Loading secure checkout...</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-4 border-b border-border bg-neutral-900/50 flex items-center gap-2">
        <Zap size={18} className="fill-blue-500 text-blue-500" />
        <h3 className="font-bold text-lg">Secure Checkout</h3>
      </div>
      
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret, theme: 'night' }}
        >
          <div className="min-h-[400px]">
             <EmbeddedCheckout className="w-full" />
          </div>
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}
