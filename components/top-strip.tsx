"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export function TopStrip() {
  const [timeLeft, setTimeLeft] = useState(2732); // 45:32

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 2732));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Component to reuse in the marquee
  const MarqueeContent = () => (
    <div className="flex items-center gap-8 text-sm font-bold uppercase tracking-wide px-4 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <span>Price increasing in:</span>
        <span className="bg-red-700 text-white px-2 py-0.5 rounded text-sm tabular-nums">
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-yellow-500">•</span>
        <span>10,247 happy customers</span>
      </div>

      <div className="flex items-center gap-2">
        <span>Best Vendors In The Game</span>
      </div>

      <div className="flex items-center gap-2">
        <span>Rated 4.98/5</span>
        <div className="flex text-yellow-400 gap-0.5">
          <Star size={12} fill="currentColor" strokeWidth={0} />
          <Star size={12} fill="currentColor" strokeWidth={0} />
          <Star size={12} fill="currentColor" strokeWidth={0} />
          <Star size={12} fill="currentColor" strokeWidth={0} />
          <Star size={12} fill="currentColor" strokeWidth={0} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-yellow-500">•</span>
        <span>73 live viewers</span>
      </div>
      
      {/* Divider to separate repeats slightly visually if needed, but gap handles it */}
      <span className="text-neutral-800">|</span>
    </div>
  );

  return (
    <div className="w-full bg-black text-white py-3 overflow-hidden relative z-50 border-b border-neutral-800">
       <div className="flex overflow-hidden select-none">
         <motion.div 
           className="flex flex-shrink-0"
           animate={{ x: "-50%" }}
           transition={{ 
             duration: 20, 
             ease: "linear", 
             repeat: Infinity 
           }}
         >
           {/* Repeat content multiple times to ensure smooth loop */}
           <MarqueeContent />
           <MarqueeContent />
           <MarqueeContent />
           <MarqueeContent />
         </motion.div>
         <motion.div 
           className="flex flex-shrink-0"
           animate={{ x: "-50%" }}
           transition={{ 
             duration: 20, 
             ease: "linear", 
             repeat: Infinity 
           }}
         >
            {/* Second set for seamless continuity if needed, though the above x: -50% trick often uses one big container. 
                Actually, standard marquee trick is translating a container of 2 copies.
            */}
           <MarqueeContent />
           <MarqueeContent />
           <MarqueeContent />
           <MarqueeContent />
         </motion.div>
       </div>
    </div>
  );
}
