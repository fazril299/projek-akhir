import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Smartphone, Palette, Box, Bot, Plus, Minus } from 'lucide-react';

export default function ServicesSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const services = [
    {
      icon: Layout,
      number: '01',
      title: 'UI/UX Design',
      desc: 'Crafting pixel-perfect, human-centric web and mobile interfaces that feel intuitive and boost conversions.',
      tags: ['Wireframing', 'Design Systems', 'Mobile Apps', 'Prototypes'],
      badge: 'bg-[#BBDAFE]',
    },
    {
      icon: Smartphone,
      number: '02',
      title: 'Framer Builds',
      desc: 'Developing blazing-fast, CMS-powered responsive websites with seamless Framer animations and edge publishing.',
      tags: ['Responsive Layouts', 'CMS Setup', 'SEO Optimization', 'Custom Code'],
      badge: 'bg-[#E0FD72]',
    },
    {
      icon: Palette,
      number: '03',
      title: 'Brand Identity',
      desc: 'Building bold, cohesive brand languages including logo marks, typography scales, color systems, and guidelines.',
      tags: ['Logo Design', 'Brand Guidelines', 'Typography', 'Iconography'],
      badge: 'bg-[#FEDCDD]',
    },
    {
      icon: Box,
      number: '04',
      title: '3D Design',
      desc: 'Designing playful 3D objects, hero illustrations, and isometric visual elements that elevate your brand narrative.',
      tags: ['3D Modeling', 'Character Badges', 'Hero Graphics', 'Spline / Blender'],
      badge: 'bg-[#F3EA9A]',
    },
    {
      icon: Bot,
      number: '05',
      title: 'AI Exploration',
      desc: 'Leveraging modern AI tooling to accelerate visual prototyping, generate creative concept art, and build intelligent web flows.',
      tags: ['Prompt Engineering', 'AI Assets', 'Creative Concepting', 'Future Interfaces'],
      badge: 'bg-[#E2DCFD]',
    },
  ];

  return (
    <section id="services" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F3EA] relative">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/10 text-xs font-bold uppercase tracking-wider text-[#252525] mb-4 shadow-xs"
            >
              <span>Services</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#252525] tracking-tight leading-none"
              style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
            >
              where i <br />
              can help you
            </motion.h2>
          </div>

          {/* Services banner image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block w-[280px] h-[160px] rounded-3xl overflow-hidden border border-black/5 shadow-xs flex-shrink-0"
          >
            <img
              src="/assets/services_banner.png"
              alt="Services"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* Services List — Framer style: expandable accordion rows */}
        <div className="space-y-0 divide-y divide-black/8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-7 flex items-center justify-between gap-4 group text-left hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-5">
                    {/* Icon Badge */}
                    <div className={`w-12 h-12 rounded-2xl ${item.badge} flex items-center justify-center text-[#252525] flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Number + Title */}
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-black text-neutral-300 uppercase tracking-widest hidden sm:block">
                        {item.number}
                      </span>
                      <h3
                        className="text-xl sm:text-2xl md:text-3xl font-black text-[#252525] uppercase tracking-tight"
                        style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Plus / Minus toggle */}
                  <div className="w-9 h-9 rounded-full bg-[#F5F3EA] group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors border border-black/5">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#252525]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#252525]" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-[68px] sm:pl-[88px]">
                        <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed mb-5 max-w-xl">
                          {item.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 rounded-full bg-white text-[11px] font-bold text-neutral-700 uppercase tracking-wide border border-black/5 shadow-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
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
