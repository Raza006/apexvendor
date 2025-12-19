"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight, Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-neutral-400 mb-8">We couldn't verify your session.</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 md:p-12 text-center shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
          <Check size={40} strokeWidth={3} />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Payment Successful! 🎉</h1>
        <p className="text-neutral-400 mb-8">
          Thank you for your purchase! Your vendor link has been sent to your email.
        </p>

        <div className="bg-blue-500/10 border border-blue-500/30 p-5 rounded-xl mb-6">
          <p className="text-lg font-semibold text-blue-400 mb-2">📧 Check Your Email</p>
          <p className="text-sm text-neutral-300 mb-1">
            Your vendor link and instructions have been sent to your email address.
          </p>
          <p className="text-xs text-neutral-400 mt-3">
            <strong>Don't see it?</strong> Check your spam/junk folder. Emails usually arrive within 1-2 minutes.
          </p>
        </div>

        <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800 mb-6 text-sm">
          <p className="text-neutral-300 mb-2">Need help or have questions?</p>
          <a 
            href="https://discord.com/invite/PBEXChby4H"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Join our Discord Community
            <ArrowRight size={16} />
          </a>
        </div>

        <Link 
          href="/" 
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
        >
          Continue Shopping
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
