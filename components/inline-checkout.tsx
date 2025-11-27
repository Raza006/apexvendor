"use client";

import { Product } from "@/lib/products";
import { Lock, CreditCard, Check, Loader2, Zap } from "lucide-react";
import { useState } from "react";

interface InlineCheckoutProps {
  product: Product;
}

export function InlineCheckout({ product }: InlineCheckoutProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStripeCheckout = async () => {
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          email: email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to redirect to payment provider. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
        <Zap size={20} className="fill-yellow-500 text-yellow-500" />
        Instant Checkout
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Email Address</label>
          <input 
            type="email" 
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xs text-neutral-500 mt-1.5">Your vendor link will be sent here immediately.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button 
          onClick={handleStripeCheckout}
          disabled={!email || loading}
          className="w-full py-4 bg-foreground text-background rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <CreditCard size={20} />}
          <span>Pay ${product.price.toFixed(2)}</span>
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 pt-2">
          <Lock size={12} />
          <span>Secured by Stripe 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
}

