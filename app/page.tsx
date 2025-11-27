"use client";

import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { TopStrip } from "@/components/top-strip";
import { FAQSection } from "@/components/faq-section";
import { SalesPopup } from "@/components/sales-popup";
import { Instagram, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">
      {/* Fixed Top Strip */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopStrip />
      </div>
      
      {/* Spacer for Fixed Top Strip */}
      <div className="h-[48px] md:h-[48px]" />

      <main className="flex flex-col md:flex-row flex-grow relative">
        {/* Left Sidebar - Profile & Info */}
        <aside className="w-full md:w-1/4 lg:w-1/5 p-6 md:fixed md:top-[48px] md:bottom-0 md:overflow-y-auto border-r border-border flex flex-col items-center text-center bg-black/80 backdrop-blur-md z-40">
          <div className="mb-6 mt-4">
            <div className="w-32 h-32 rounded-full bg-neutral-900 flex items-center justify-center mb-4 mx-auto shadow-lg border-2 border-neutral-700 overflow-hidden relative">
               <Image 
                 src="/assets/Apex Vendor.jpg" 
                 alt="Apex Vendor" 
                 fill 
                 className="object-cover"
               />
            </div>
            <h1 className="text-2xl font-bold mb-2">Apex Vendors</h1>
            <div className="flex items-center justify-center gap-1 text-sm text-green-500 mb-4">
               <ShieldCheck size={16} />
               <span className="font-semibold">Verified Reseller</span>
            </div>
            
            {/* Trusted By Section - Moved Here */}
            <div className="mb-6 flex flex-col items-center">
               <p className="text-neutral-500 mb-2 text-[10px] font-medium uppercase tracking-wider">Trusted by 2,400+ Resellers</p>
               <div className="flex justify-center items-center -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full border border-background bg-neutral-800 overflow-hidden relative">
                      <Image 
                        src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                        alt="User" 
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full border border-background bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[8px] font-bold text-neutral-600 dark:text-neutral-400">
                    +2k
                  </div>
               </div>
            </div>

            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              Access the exact suppliers that verify and test products. 
              High quality, passing serials, and fast shipping.
            </p>
          </div>

          <div className="flex gap-4 mb-8">
            <Link 
              href="https://www.tiktok.com/@loidsyt" 
              target="_blank"
              className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            >
              {/* TikTok Icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="fill-current">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </Link>
            <Link 
              href="https://www.instagram.com/loidsecom" 
              target="_blank"
              className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            >
              <Instagram size={20} />
            </Link>
            <Link 
              href="https://discord.gg/PBEXChby4H" 
              target="_blank"
              className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            >
              {/* Discord Icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="fill-current">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </Link>
          </div>

          <div className="mt-auto mb-4 text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Apex Vendors
          </div>
        </aside>

        {/* Right Content - Product Grid */}
        <div className="flex-1 md:ml-[25%] lg:ml-[20%] p-4 md:p-10 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8 flex justify-between items-center px-2 mt-4 md:mt-0">
              <h2 className="text-xl font-semibold">Product Links</h2>
              <div className="text-sm text-neutral-500">
                {products.length} Products
              </div>
            </header>

            {/* Mobile: Vertical Stack of Rectangles | Desktop: Grid */}
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="px-2 mt-16">
               <FAQSection />
            </div>
          </div>
        </div>
      </main>
      
      <SalesPopup />
    </div>
  );
}
