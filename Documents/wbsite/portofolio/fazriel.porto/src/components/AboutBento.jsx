import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function AboutBento({ onOpenContact }) {
  const stats = [
    {
      value: '100%',
      title: 'Framer Native',
      desc: 'Responsive Framer websites designed, built, and published.',
    },
    {
      value: '12+',
      title: 'Industries explored',
      desc: 'Worked across SaaS, fintech, AI, agencies, finance, and service businesses.',
    },
    {
      value: '40+',
      title: 'Projects Designed',
      desc: 'From landing pages to mobile apps, and complete Framer website experiences.',
    },
    {
      value: '8+',
      title: 'Years of Experience',
      desc: 'Designing websites, apps, and digital products with a clear focus on usability.',
    },
  ];

  return (
    <section id="about" className="w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#F5F3EA] relative">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/10 text-xs font-bold uppercase tracking-wider text-[#252525] mb-6 shadow-xs"
          >
            <span>About</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-[#252525] tracking-tight leading-[0.95] max-w-3xl"
            style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
          >
            i make <span className="underline decoration-[#E0FD72] decoration-4">DESIGNs</span> <br />
            PEOPLE REMEMBER
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 text-base sm:text-lg text-neutral-600 max-w-xl font-medium leading-relaxed"
          >
            I design clean websites, apps, and brand systems that help ideas look sharper,
            feel trusted and work with purpose.
          </motion.p>

          {/* Start a project CTA — visible in About section (Framer reference) */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenContact}
            className="mt-8 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#252525] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:bg-black transition-all cursor-pointer"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Bento Grid — 4 stat cards + about banner image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-black/5 rounded-3xl p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3
                  className="font-black tracking-tight text-[#252525] mb-3"
                  style={{
                    fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif',
                    fontSize: 'clamp(40px, 5vw, 52px)',
                  }}
                >
                  {item.value}
                </h3>
                <h4 className="text-base font-bold text-[#252525] uppercase tracking-wide mb-2">
                  {item.title}
                </h4>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Banner Image (below stat cards — matches Framer layout) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-5 w-full rounded-3xl overflow-hidden border border-black/5 shadow-xs"
          style={{ maxHeight: '420px' }}
        >
          <img
            src="/assets/about_banner.png"
            alt="About banner"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

      </div>
    </section>
  );
}
