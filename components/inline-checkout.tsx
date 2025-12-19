"use client";

import { Product } from "@/lib/products";
import { Loader2, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./checkout-form";
import { Appearance } from "@stripe/stripe-js";

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
    // Create a PaymentIntent as soon as the component mounts
    console.log("🚀 Creating payment intent for product:", product.id);
    setLoading(true);
    fetch("/api/create-payment-intent", {
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
        console.log("✅ Payment intent response:", data);
        console.log("🔑 Client secret:", data.clientSecret ? "EXISTS" : "MISSING");
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error creating payment intent:", err);
        setLoading(false);
      });
  }, [product.id]);

  // Custom styling to match "Apex Vendor" theme perfectly
  const appearance: Appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#3b82f6', // blue-500
      colorBackground: '#0a0a0a', // Match card bg
      colorText: '#ededed', // Match foreground
      colorDanger: '#ef4444',
      fontFamily: 'Space Grotesk, system-ui, sans-serif', // Font stack matching globals.css
      spacingUnit: '5px', // Slightly more spacious
      borderRadius: '12px',
      fontSizeBase: '16px', // Explicitly set font size
    },
    rules: {
      '.Input': {
        backgroundColor: '#050505', // Darker input bg
        border: '1px solid #262626', // Neutral-800 border
        boxShadow: 'none',
        paddingTop: '12px',
        paddingBottom: '12px',
      },
      '.Input:focus': {
        border: '1px solid #3b82f6', // Blue border on focus
        boxShadow: '0 0 0 1px #3b82f6',
      },
      '.Label': {
        fontWeight: '500',
        color: '#a3a3a3', // Neutral-400
        marginBottom: '6px',
      }
    }
  };

  const options = {
    clientSecret,
    appearance,
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
      },
    ],
  };

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
      
      <div className="p-6 md:p-8">
        {!clientSecret && !loading && (
          <div className="text-red-400 p-4 bg-red-500/10 rounded-lg">
            ❌ Failed to initialize checkout. Check console for errors.
          </div>
        )}
        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm amount={product.price} clientSecret={clientSecret} />
          </Elements>
        ) : loading ? (
          <div className="text-center text-neutral-400">Loading payment form...</div>
        ) : null}
      </div>
    </div>
  );
}
