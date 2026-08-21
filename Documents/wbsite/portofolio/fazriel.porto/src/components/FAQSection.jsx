import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'What can you design?',
      a: 'I specialize in end-to-end digital experiences: responsive web design, mobile apps (iOS/Android), Framer development, brand identity systems, 3D asset exploration, and UI design systems.',
    },
    {
      q: 'Do you build in framer?',
      a: 'Yes, absolutely! I build responsive, production-ready, lightning-fast Framer websites with interactive scroll effects, CMS integration, custom React code overrides, and complete SEO setup.',
    },
    {
      q: 'What do you need from me?',
      a: 'A quick overview of your product or idea, your target audience, any existing branding or copy, and your ideal launch timeline. If you have nothing yet, we can start from scratch!',
    },
    {
      q: 'How fast can we start?',
      a: 'Most design sprints and projects can begin within 2 to 5 business days after our discovery chat and proposal sign-off.',
    },
    {
      q: 'Do you only design visuals?',
      a: 'No, design without strategy is just decoration. I prioritize user journey optimization, conversion rates, information architecture, usability testing, and clean technical handoffs.',
    },
  ];

  return (
    <section id="faqs" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F3EA] relative">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/10 text-xs font-bold uppercase tracking-wider text-[#252525] mb-4 shadow-xs"
          >
            <span>FAQs</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#252525] tracking-tight leading-none"
            style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
          >
            Answer Before <br />
            We Starts
          </motion.h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="bg-white rounded-2xl border border-black/5 shadow-xs overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-black/[0.01] transition-colors"
                >
                  <span
                    className="font-black text-base sm:text-lg text-[#252525]"
                    style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#252525] text-white rotate-180'
                        : 'bg-[#F5F3EA] text-[#252525]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-neutral-600 text-sm font-medium leading-relaxed border-t border-black/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
