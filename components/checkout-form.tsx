"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2, Lock, AlertCircle, Mail } from "lucide-react";

interface CheckoutFormProps {
  amount: number;
  clientSecret?: string;
}

export function CheckoutForm({ amount, clientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      // Update the payment intent with the email BEFORE confirming
      if (clientSecret) {
        const paymentIntentId = clientSecret.split('_secret_')[0];
        
        console.log("📧 Updating payment intent with email:", email);
        await fetch('/api/update-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentIntentId, email, name })
        });
      }

      // Now confirm the payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
          payment_method_data: {
            billing_details: {
              email: email,
              name: name || undefined,
            },
          },
        },
      });

      if (error) {
        setMessage(error.message || "An unexpected error occurred.");
      }
    } catch (err) {
      console.error("Error in payment flow:", err);
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      {/* Email Field - REQUIRED */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          Email Address <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-11 pr-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Name Field - OPTIONAL */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          Full Name <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Stripe Payment Element */}
      <div className="pt-2">
        <PaymentElement 
          id="payment-element"
          options={{ 
            layout: "tabs",
            terms: {
              card: 'never'
            },
            fields: {
              billingDetails: {
                email: 'never',
                address: {
                  country: 'auto',
                  postalCode: 'auto'
                }
              }
            },
            wallets: {
              applePay: 'always',
              googlePay: 'always'
            }
          }} 
        />
      </div>

      {message && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          <span>{message}</span>
        </div>
      )}

      <button
        disabled={isLoading || !stripe || !elements || !email}
        id="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Processing...
          </>
        ) : (
          <>
            <Lock size={18} />
            Pay ${amount.toFixed(2)}
          </>
        )}
      </button>
      
      <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
         <Lock size={12} />
         <span>Encrypted & Secure Payment</span>
      </div>
    </form>
  );
}
