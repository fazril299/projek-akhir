import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Ayesha K.',
      role: 'Creative Director',
      quote: '"Sharp design without overcomplicating it."',
      text: 'The final design looked modern, but still felt practical. Everything was ready to hand off.',
      avatar: '/assets/client_ayesha.png',
      badge: 'bg-[#BBDAFE]',
    },
    {
      name: 'Daniel R.',
      role: 'Product Lead',
      quote: '"The flow became much easier to use."',
      text: 'She cleaned up the user journey, and made the product feel more focused and professional.',
      avatar: '/assets/client_daniel.png',
      badge: 'bg-[#E0FD72]',
    },
    {
      name: 'Sarah M.',
      role: 'Founder',
      quote: '"The website finally feels like our brand."',
      text: 'She turned our idea into a polished website that felt premium, and easy to understand.',
      avatar: '/assets/client_sarah.png',
      badge: 'bg-[#FEDCDD]',
    },
  ];

  return (
    <section id="reviews" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F3EA] relative">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/10 text-xs font-bold uppercase tracking-wider text-[#252525] mb-4 shadow-sm"
          >
            <span>Reviews</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#252525] tracking-tight leading-none"
            style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
          >
            CLIENTS LIKED <br className="hidden sm:block" />
            <span className="text-[#34C75A]">THE PIXELS</span>
          </motion.h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <h3
                  className="text-xl sm:text-2xl font-black text-[#252525] leading-snug mb-3"
                  style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
                >
                  {rev.quote}
                </h3>
                <p className="text-neutral-600 text-sm font-medium leading-relaxed mb-8">
                  {rev.text}
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-black/5">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-black/10 shadow-sm"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#252525] uppercase tracking-wide">
                    {rev.name}
                  </h4>
                  <p className="text-xs font-semibold text-neutral-400">
                    {rev.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
