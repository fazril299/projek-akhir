import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#project' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3 ${
        isScrolled
          ? 'bg-[#F5F3EA]/90 backdrop-blur-xl border-b border-[#252525]/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand Logo — visible only when scrolled past hero */}
        <motion.a
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="font-black tracking-widest text-lg uppercase text-[#252525] pointer-events-auto"
          style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
        >
          CREATIE®
        </motion.a>

        {/* Invisible spacer when logo is hidden */}
        {!isScrolled && <div className="w-24" />}

        {/* Desktop Nav Pills — center */}
        <div
          className={`hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-white/80 border border-black/8 shadow-sm text-[#252525]'
              : 'bg-black/25 backdrop-blur-md border border-white/20 text-white shadow-lg'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenContact}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:scale-105 ${
              isScrolled
                ? 'bg-[#252525] text-white hover:bg-black'
                : 'bg-white text-[#252525] hover:bg-white/90'
            }`}
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-xl backdrop-blur-md ${
            isScrolled
              ? 'bg-white text-black border border-black/10'
              : 'bg-black/30 text-white border border-white/20'
          }`}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F5F3EA] border-b border-black/10 shadow-xl overflow-hidden mt-3 rounded-2xl p-6 flex flex-col gap-4 text-center font-bold text-sm tracking-wider"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#252525] hover:text-black border-b border-black/5 uppercase"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="mt-2 w-full py-3 bg-[#252525] text-white rounded-xl font-bold uppercase text-xs flex items-center justify-center gap-2"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
