"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2, Lock, AlertCircle } from "lucide-react";

interface CheckoutFormProps {
  amount: number;
}

export function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        payment_method_data: {
          billing_details: {
            address: {
              country: 'US',
              postal_code: '00000',
            },
          },
        },
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      {!isFormReady && (
        <div className="space-y-4 animate-pulse">
          <div className="h-12 bg-neutral-800 rounded-lg"></div>
          <div className="h-12 bg-neutral-800 rounded-lg"></div>
          <div className="h-12 bg-neutral-800 rounded-lg"></div>
        </div>
      )}
      <div className={`space-y-4 ${!isFormReady ? 'hidden' : ''}`}>
        <PaymentElement 
           id="payment-element"
           onReady={() => setIsFormReady(true)}
           options={{ 
             layout: "tabs",
             business: { name: "Apex Vendor" },
             wallets: {
               applePay: 'auto',
               googlePay: 'auto'
             },
             fields: {
               billingDetails: {
                 name: 'auto',
                 email: 'auto',
                 phone: 'auto',
                 address: 'never'
               }
             },
             defaultValues: {
               billingDetails: {
                 name: '',
                 email: ''
               }
             },
             terms: {
               card: 'never'
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
        disabled={isLoading || !stripe || !elements || !isFormReady}
        id="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
      >
        {!isFormReady ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Loading...
          </>
        ) : isLoading ? (
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
