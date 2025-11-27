"use client";

import Image from "next/image";
import { Product } from "@/lib/products";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isElite = product.id === "elite-bundle";

  return (
    <Link href={`/products/${product.id}`} className="h-full block">
      {/* Desktop Card Layout */}
      <div 
        className={clsx(
          "hidden md:flex flex-col h-full relative bg-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300",
          "border border-white/20 hover:border-white/40", // Thin white border
          "hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" // Silver shine effect on hover
        )}
      >
        {/* Continuous Border Animation (Pseudo-element) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.3)_90deg,transparent_180deg)] animate-spin-slow opacity-0 group-hover:opacity-0 transition-opacity" />
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer-x_3s_infinite]" />
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer-x-reverse_3s_infinite]" />
          <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent animate-[shimmer-y_3s_infinite]" />
          <div className="absolute right-0 bottom-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent animate-[shimmer-y-reverse_3s_infinite]" />
        </div>

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%)] bg-[length:200%_200%] animate-[shine_1.5s_ease-in-out_infinite]" />

        {/* Badges */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
          {/* Best Value Badge - Red */}
          {isElite && (
            <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1 border border-red-400/30">
              <Sparkles size={10} className="animate-spin-slow" />
              BEST VALUE
            </div>
          )}
          {/* Sale Badge for others */}
          {!isElite && (
             <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
               SALE
             </div>
          )}
        </div>

        <div className="relative w-full h-56 bg-neutral-100 dark:bg-neutral-900/50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </div>
        
        <div className="p-6 flex flex-col flex-grow z-10 bg-card">
          <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-neutral-300 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-bold text-2xl text-blue-400">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-neutral-500 line-through decoration-red-500/50">
              ${product.originalPrice.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2 mb-6 flex-grow">
            {product.description.slice(0, 3).map((desc, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-neutral-400">
                <Check size={14} className="mt-0.5 text-neutral-500" />
                <span>{desc}</span>
              </div>
            ))}
          </div>

          <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-sm transition-all duration-300">
            View Details
          </button>
        </div>
      </div>

      {/* Mobile Card Layout (Rectangular Row) */}
      <div className="md:hidden flex items-center gap-4 bg-card border border-white/10 rounded-xl p-3 mb-3 active:scale-[0.98] transition-transform shadow-sm">
        <div className="relative w-20 h-20 bg-neutral-900/50 rounded-lg flex-shrink-0 border border-white/5">
           <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2"
          />
        </div>
        
        <div className="flex-grow min-w-0">
           <div className="flex justify-between items-start">
              <h3 className="font-bold text-sm truncate pr-2">{product.name}</h3>
              {isElite && (
                <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
                  BEST
                </span>
              )}
           </div>
           <div className="flex items-baseline gap-2 mt-1 mb-1">
             <span className="font-bold text-lg text-blue-400">${product.price.toFixed(2)}</span>
             <span className="text-xs text-neutral-600 line-through">${product.originalPrice.toFixed(2)}</span>
           </div>
           <p className="text-xs text-neutral-500 truncate">
             {product.description[0]}
           </p>
        </div>
      </div>
    </Link>
  );
}
