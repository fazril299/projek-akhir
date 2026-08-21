import React from 'react';
import { motion } from 'framer-motion';
import TitleChip from './TitleChip';
import InteractiveEyes from './InteractiveEyes';

export default function Hero({ onOpenContact }) {
  return (
    <section
      className="relative w-full min-h-screen h-screen max-h-[1100px] bg-[#F5F3EA] overflow-hidden flex flex-col justify-between items-center select-none"
      style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
    >

      {/* 1. Background Wallpaper */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 pointer-events-none"
        style={{ backgroundImage: "url('/assets/hero_bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none z-[1]" />

      {/* 2. Top Header Brand Logo — centered, inside hero (below sticky Navbar) */}
      <header className="w-full flex justify-center items-center pt-[72px] sm:pt-[80px] z-20 px-6">
        <motion.a
          href="#home"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-white text-xl sm:text-2xl font-black tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform whitespace-nowrap"
        >
          CREATIE®
        </motion.a>
      </header>

      {/* 3. Floating Interactive Eyes in Left Sky */}
      <div className="absolute top-[22%] sm:top-[24%] left-[8%] sm:left-[14%] md:left-[16%] z-20 hidden sm:block">
        <InteractiveEyes />
      </div>

      {/* 4. Center Stage Container */}
      <div className="w-full max-w-[600px] px-4 z-20 flex flex-col items-center justify-center relative mt-[-48px] sm:mt-[-24px]">

        {/* Profile Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          whileHover={{ scale: 1.03 }}
          className="mb-6 sm:mb-8 bg-black/25 backdrop-blur-xl border border-white/25 px-4 py-2 rounded-full flex items-center gap-3 shadow-lg cursor-pointer whitespace-nowrap self-start"
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <img src="/assets/avatar.png" alt="Sarah" className="w-8 h-8 rounded-full object-cover border border-white/40 shadow-xs" />
          <div className="text-left">
            <p className="text-white font-bold uppercase tracking-wider leading-none" style={{ fontSize: '11px' }}>
              SARAH - PRODUCT DESIGNER
            </p>
            <div className="flex items-center gap-1.5 text-white/85 font-medium mt-0.5" style={{ fontSize: '10px' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C75A] animate-pulse" />
              Available for work
            </div>
          </div>
        </motion.div>

        {/* Headline Container with 3 Floating Chips */}
        <div className="relative w-full">
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="text-white font-black uppercase leading-[0.9] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] select-none tracking-tight"
            style={{
              fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(46px, 7vw, 72px)',
              letterSpacing: '-0.04em',
            }}
          >
            DESIGN THAT<br />
            MAKES<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PEOPLE<br />
            LOOK TWICE
          </motion.h1>

          {/* Chip 1: UI/UX Design (Green - Top Right) */}
          <TitleChip
            label="UI/UX Design"
            variant="green"
            icon="layers"
            className="absolute -top-7 sm:-top-9 -right-4 sm:-right-10 md:-right-14 rotate-[10deg] z-30 pointer-events-auto shadow-xl"
          />

          {/* Chip 2: Illustration (Pink - Middle Right of 2nd line) */}
          <TitleChip
            label="Illustration"
            variant="pink"
            icon="pen"
            className="absolute top-[72px] sm:top-[85px] left-[160px] sm:left-[230px] md:left-[270px] rotate-[6deg] z-30 pointer-events-auto shadow-xl"
          />

          {/* Chip 3: 3D Design (Purple - Bottom Left) */}
          <TitleChip
            label="3D Design"
            variant="purple"
            icon="box"
            className="absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-10 rotate-[-10deg] z-30 pointer-events-auto shadow-xl hidden sm:inline-flex"
          />
        </div>
      </div>

      {/* 5. Bottom Bar */}
      <div className="w-full px-6 sm:px-12 pb-8 sm:pb-10 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 z-20">

        {/* Bottom Left: Brand Statement */}
        <div className="hidden lg:flex flex-col items-start gap-1">
          <div className="w-6 h-[2px] bg-white mb-0.5" />
          <p className="text-white text-xs sm:text-sm font-semibold tracking-wide">
            Not just visuals.
          </p>
          <p className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-wider">
            i make digital things look alive
          </p>
        </div>

        {/* Center / Navigation Dock */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
          className="bg-[#ECEEE0]/45 border border-white/60 p-2 rounded-[22px] shadow-[0px_3px_14px_rgba(0,0,0,0.18),_inset_0px_1px_2px_rgba(255,255,255,0.5)] flex items-center gap-2"
        >
          {[
            { href: '#about',    src: '/assets/dock_notes.png',  label: 'About' },
            { href: '#project',  src: '/assets/dock_photos.png', label: 'Projects' },
            { href: '#services', src: '/assets/dock_finder.png', label: 'Services' },
          ].map(({ href, src, label }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ y: -6, scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
              className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-[16px] sm:rounded-[18px] group focus:outline-none flex items-center justify-center"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none bg-white text-[#252525] px-2 py-0.5 rounded-md text-[11px] font-semibold shadow-md whitespace-nowrap z-40">
                {label}
              </div>
              <img src={src} alt={label} className="w-full h-full object-cover rounded-[16px] sm:rounded-[18px] pointer-events-none" />
            </motion.a>
          ))}
          <motion.button
            onClick={() => { if (onOpenContact) onOpenContact(); }}
            whileHover={{ y: -6, scale: 1.12 }}
            whileTap={{ scale: 0.93 }}
            className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-[16px] sm:rounded-[18px] group focus:outline-none flex items-center justify-center"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none bg-white text-[#252525] px-2 py-0.5 rounded-md text-[11px] font-semibold shadow-md whitespace-nowrap z-40">
              Contact
            </div>
            <img src="/assets/dock_mail.png" alt="Contact" className="w-full h-full object-cover rounded-[16px] sm:rounded-[18px] pointer-events-none" />
          </motion.button>
        </motion.div>

        {/* Bottom Right: Made in Framer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="hidden sm:flex bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md items-center gap-2 text-xs font-bold text-[#252525] border border-white/50 cursor-pointer hover:bg-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
          </svg>
          Made in Framer
        </motion.div>

      </div>

    </section>
  );
}
