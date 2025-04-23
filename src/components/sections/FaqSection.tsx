"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

// FAQ data
const faqs = [
  {
    question: "What is nothing bot ?",
    answer: "nothing bot is a powerful, high-quality music bot for Discord with Lavalink integration for premium audio quality and full Spotify support. "
  },
  {
    question: "How do I add nothing bot to my Discord server?",
    answer: "You can add nothing bot to your Discord server by clicking the 'Add to Discord' button at the top of this page. This will redirect you to Discord's authorization page where you can select the server you want to add the bot to."
  },
  {
    question: "Is nothing bot free to use?",
    answer: "Yes! nothing bot is completely free to use with all its core features. We do offer premium tiers for advanced features and higher quality audio options."
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0a0a0d] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0f0f13] to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full filter blur-[120px]" />
      <div className="absolute top-1/3 left-20 w-64 h-64 bg-red-600/10 rounded-full filter blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Questions</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Got questions? We've got answers. If you can't find what you're looking for, feel free to join our support server.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={`faq-${index}`}
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className={`w-full text-left px-6 py-5 bg-[#16161d] border ${
                  activeIndex === index ? "border-orange-500/30 rounded-t-xl" : "border-gray-800 rounded-xl hover:border-gray-700"
                } flex items-center justify-between transition-colors`}
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-xl font-semibold text-white pr-8">{faq.question}</h3>
                <div className={`p-2 rounded-full ${
                  activeIndex === index ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400"
                }`}>
                  {activeIndex === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </button>

              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 bg-[#16161d]/60 rounded-b-xl border-x border-b border-orange-500/30 text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="https://discord.com/invite/hBvdRJgXzM"
            className="inline-flex items-center text-orange-500 hover:text-orange-400 font-medium"
          >
            <span>Still have questions? Join our support server</span>
            <ChevronRight size={16} className="ml-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
