"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { products } from "@/lib/products";

const USERNAMES = [
  "apexresells", "drippyvendor", "moneyglitch", "resellking", 
  "vendorplug", "supplychain", "easyflips", "profitmargins", 
  "cop_or_drop", "resell_god"
];

export function SalesPopup() {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState({ name: "", action: "" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const MAX_NOTIFICATIONS = 5;
    
    // Initial delay
    const initialTimer = setTimeout(() => {
      triggerNotification();
    }, 5000);

    const interval = setInterval(() => {
      if (count >= MAX_NOTIFICATIONS) {
        clearInterval(interval);
        return;
      }
      triggerNotification();
    }, 30000); // Every 30 seconds

    const triggerNotification = () => {
      setCount(prev => {
        if (prev >= MAX_NOTIFICATIONS) return prev;
        
        const randomName = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
        const randomProduct = products[Math.floor(Math.random() * products.length)].name;
        
        setNotification({ 
          name: randomName, 
          action: `just bought ${randomProduct}` 
        });
        setVisible(true);

        // Hide after 4 seconds
        setTimeout(() => {
          setVisible(false);
        }, 4000);

        return prev + 1;
      });
    };

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: -20 }}
          className="fixed bottom-6 left-6 z-50 bg-card/90 backdrop-blur-md border border-white/10 text-foreground px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[250px]"
        >
          <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
            <ShoppingBag size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-blue-400">@{notification.name}</span>
            <span className="text-xs text-neutral-400">{notification.action}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
