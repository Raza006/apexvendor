"use client";

import { products } from "@/lib/products";
import { TopStrip } from "@/components/top-strip";
import { FAQSection } from "@/components/faq-section";
import { Check, ChevronLeft, Star, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { InlineCheckout } from "@/components/inline-checkout";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">
      {/* Fixed Top Strip */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopStrip />
      </div>
      
      {/* Spacer for Fixed Top Strip */}
      <div className="h-[48px] md:h-[48px]" />

      <main className="max-w-6xl mx-auto w-full p-6 md:p-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-foreground mb-8 transition-colors">
          <ChevronLeft size={16} />
          Back to all vendors
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
          {/* Left: Image */}
          <div className="relative w-full aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-border overflow-hidden">
            <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              Selling Fast
            </div>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8 hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right: Details */}
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="flex text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
               </div>
               <span className="text-sm text-neutral-500">4.98/5 Rating</span>
            </div>

            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-end gap-3 mb-6">
               <span className="text-3xl font-bold text-blue-400">
                 ${product.price.toFixed(2)}
               </span>
               {product.originalPrice && (
                 <span className="text-xl text-neutral-400 line-through mb-1">
                   ${product.originalPrice.toFixed(2)}
                 </span>
               )}
               <span className="text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded mb-1">
                 In Stock
               </span>
            </div>

            <div className="prose dark:prose-invert mb-8">
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Get instant access to our premium verified vendor list. 
                Stop searching for reliable suppliers and start reselling today with verified, high-quality sources.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {product.description.map((desc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full">
                    <Check size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Width Centered Checkout Section */}
        <div className="w-full border-t border-border pt-10 mb-10">
           <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-6">Secure Checkout</h2>
              <InlineCheckout product={product} />
              
              {/* IMPORTANT DISCLAIMER - Blue version, moved under checkout */}
              <div className="p-4 border border-blue-500/30 bg-blue-500/10 rounded-xl flex gap-3 items-start mt-6">
                <AlertCircle size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-neutral-300">
                  <p className="font-bold text-blue-400 mb-1">Didn't receive your link?</p>
                  <p>
                    If you do not receive your products immediately, please check your spam folder. 
                    Still nothing? Join our <Link href="https://discord.gg/PBEXChby4H" target="_blank" className="text-blue-400 hover:underline font-bold">Discord</Link> and open a ticket with a screenshot of your purchase + email address to receive the link manually.
                  </p>
                </div>
              </div>

              <p className="text-center text-xs text-neutral-500 mt-4">
                <span className="font-bold">73 people</span> are looking at this product right now.
              </p>
           </div>
        </div>

        <div className="border-t border-border pt-10">
           <FAQSection />
        </div>
      </main>
    </div>
  );
}
