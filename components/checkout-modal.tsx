"use client";

import { Product } from "@/lib/products";
import { X, Lock, CreditCard, Wallet, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

export function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [error, setError] = useState("");

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError("");

    // Temporarily disabled as per request
    // In a real scenario, this would call the API endpoint
    setTimeout(() => {
      setError("Checkout is currently disabled for maintenance. Please try again later.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-background w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-border animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="font-bold text-lg">Checkout</h2>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === "details" && (
            <>
              {/* Product Summary */}
              <div className="flex gap-4 mb-6">
                <div className="relative w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-border flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-neutral-500 mb-1">Instant Delivery</p>
                  <p className="font-bold text-green-600">${product.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full p-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-neutral-500 mt-1">Your vendor link will be sent here.</p>
                </div>

                <button 
                  onClick={() => {
                    if(email) setStep("payment");
                  }}
                  disabled={!email}
                  className="w-full py-3 bg-foreground text-background rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  Continue to Payment
                </button>
              </div>
            </>
          )}

          {step === "payment" && (
            <>
              <div className="mb-6 text-center">
                 <p className="text-sm text-neutral-500">Total to pay</p>
                 <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-3 mb-6">
                 <button 
                   onClick={handleStripeCheckout}
                   disabled={loading}
                   className="w-full p-3 border border-border rounded-lg flex items-center gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors disabled:opacity-50"
                 >
                   {loading ? <Loader2 className="animate-spin" size={20} /> : <CreditCard size={20} />}
                   <span className="font-medium">Pay with Card (Stripe)</span>
                 </button>
                 <button 
                   disabled
                   className="w-full p-3 border border-border rounded-lg flex items-center gap-3 opacity-50 cursor-not-allowed"
                 >
                   <Wallet size={20} />
                   <span className="font-medium">Crypto (Coming Soon)</span>
                 </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                <Lock size={12} />
                <span>Secured by 256-bit encryption</span>
              </div>

              <button 
                onClick={() => setStep("details")}
                className="w-full mt-4 text-sm text-neutral-500 hover:underline"
              >
                Back
              </button>
            </>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Order Confirmed!</h3>
              <p className="text-neutral-500 mb-6">
                We've sent the vendor link to <strong>{email}</strong>.
              </p>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-foreground text-background rounded-lg font-medium"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
