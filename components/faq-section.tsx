"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What does buying a supplier get me?",
    answer: "Buying a supplier bundle gets you instant access to several trusted, reliable suppliers that sells quality products at competitive prices. This allows you to source items efficiently for your needs."
  },
  {
    question: "How will I receive access to the supplier?",
    answer: "Once you complete your purchase, the supplier's contact is INSTANTLY sent via email and will be available immediately on the order confirmation page."
  },
  {
    question: "How long does the supplier take to ship?",
    answer: "Shipping times range from 2-7 days, and rarely take longer. The most common shipment time is about a week. You can ask the suppliers for accurate shipment times."
  },
  {
    question: "Do the suppliers ship worldwide?",
    answer: "Yes! These suppliers ship worldwide, no matter where you're located. You don't have to worry about not being able to access them in your country."
  },
  {
    question: "How much do the suppliers charge for a product?",
    answer: "The suppliers charge anywhere from $10-$100 per product. Some are cheaper than others."
  },
  {
    question: "What if I can't find my order?",
    answer: "Your order will be available for download directly after checkout and an email containing the supplier will be sent to you immediately. If you still can't find them, open a ticket in our discord."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-20 mb-10">
      <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-border rounded-lg overflow-hidden bg-card"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <span>{faq.question}</span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 pt-0 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

