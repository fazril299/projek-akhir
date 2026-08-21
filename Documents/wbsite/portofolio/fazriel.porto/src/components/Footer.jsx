import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PROJECTS', href: '#project' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'FAQS', href: '#faqs' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <footer id="contact" className="w-full bg-[#F5F3EA] pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Giant CTA Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#252525] text-white rounded-3xl sm:rounded-5xl overflow-hidden shadow-2xl"
        >
          {/* Footer Banner Image (full bleed behind content) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/assets/footer_banner.png"
              alt=""
              className="w-full h-full object-cover opacity-30"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#252525]/90 via-[#252525]/60 to-[#252525]/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-16 lg:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-white mb-6 backdrop-blur-md">
                <span>Contact</span>
              </div>

              <h2
                className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-6"
                style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
              >
                Let's build <br />
                something <br />
                <span className="text-[#E0FD72]">memorable</span>
              </h2>

              <p className="text-white/80 text-base sm:text-lg font-medium max-w-md">
                Have an idea? Let's turn it into a sharp digital experience.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenContact}
                className="px-8 py-4 rounded-full bg-white text-[#252525] font-black text-sm sm:text-base uppercase tracking-wider shadow-2xl flex items-center gap-3 hover:bg-[#E0FD72] transition-all cursor-pointer"
              >
                <span>Let's chat</span>
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer Navigation & Brand */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-black/10">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <span
              className="font-black text-xl tracking-wider text-[#252525] uppercase"
              style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
            >
              CREATIE®
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-wider text-neutral-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-black transition-colors flex items-center gap-1"
            >
              <span>Back to top ↑</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
