import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function InteractiveEyes({ className = '' }) {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const [isBlinking, setIsBlinking] = useState(false);

  // Motion values for smooth 60fps pupil tracking
  const leftTargetX = useMotionValue(0);
  const leftTargetY = useMotionValue(0);
  const rightTargetX = useMotionValue(0);
  const rightTargetY = useMotionValue(0);

  const springConfig = { stiffness: 450, damping: 26 };
  const smoothLeftX = useSpring(leftTargetX, springConfig);
  const smoothLeftY = useSpring(leftTargetY, springConfig);
  const smoothRightX = useSpring(rightTargetX, springConfig);
  const smoothRightY = useSpring(rightTargetY, springConfig);

  // Periodic Blink Animation (every 4 seconds)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 130);
    }, 4000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Global Pointer Event tracking
  useEffect(() => {
    const handlePointerMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const calcOffset = (el) => {
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const angle = Math.atan2(dy, dx);
        
        // Travel limit in pixels inside sclera
        const maxOffset = 10;
        const dist = Math.min(maxOffset, Math.hypot(dx, dy) / 12);

        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
        };
      };

      const leftOff = calcOffset(leftEyeRef.current);
      const rightOff = calcOffset(rightEyeRef.current);

      leftTargetX.set(leftOff.x);
      leftTargetY.set(leftOff.y);
      rightTargetX.set(rightOff.x);
      rightTargetY.set(rightOff.y);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0]);
      }
    }, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [leftTargetX, leftTargetY, rightTargetX, rightTargetY]);

  return (
    <div className={`inline-flex items-center gap-[6px] select-none rotate-0 drop-shadow-[0_6px_16px_rgba(0,0,0,0.25)] ${className}`}>
      {/* Left Eye Capsule (28px x 42px or scalable) */}
      <div
        ref={leftEyeRef}
        className={`w-7 h-11 sm:w-8 sm:h-12 md:w-[32px] md:h-[48px] bg-[#FFFEFD] rounded-[40px] relative overflow-hidden flex items-center justify-center border border-black/5 shadow-md transition-transform duration-100 ease-out ${
          isBlinking ? 'scale-y-[0.1]' : 'scale-y-100'
        }`}
        style={{ transformOrigin: 'center' }}
      >
        {/* Left Pupil */}
        <motion.div
          className="w-5 h-7 sm:w-5.5 sm:h-8 md:w-[20px] md:h-[28px] bg-[#0C0C0C] rounded-full absolute flex flex-col items-center justify-end pb-[2px] shadow-sm pointer-events-none"
          style={{
            x: smoothLeftX,
            y: smoothLeftY,
          }}
        >
          {/* White Reflection Highlight */}
          <div className="w-[3.5px] h-[3.5px] md:w-[4px] md:h-[4px] bg-[#FFFEFD] rounded-full mb-[2px] shadow-xs" />
        </motion.div>
      </div>

      {/* Right Eye Capsule (28px x 42px) */}
      <div
        ref={rightEyeRef}
        className={`w-7 h-11 sm:w-8 sm:h-12 md:w-[32px] md:h-[48px] bg-[#FFFEFD] rounded-[40px] relative overflow-hidden flex items-center justify-center border border-black/5 shadow-md transition-transform duration-100 ease-out ${
          isBlinking ? 'scale-y-[0.1]' : 'scale-y-100'
        }`}
        style={{ transformOrigin: 'center' }}
      >
        {/* Right Pupil */}
        <motion.div
          className="w-5 h-7 sm:w-5.5 sm:h-8 md:w-[20px] md:h-[28px] bg-[#0C0C0C] rounded-full absolute flex flex-col items-center justify-end pb-[2px] shadow-sm pointer-events-none"
          style={{
            x: smoothRightX,
            y: smoothRightY,
          }}
        >
          {/* White Reflection Highlight */}
          <div className="w-[3.5px] h-[3.5px] md:w-[4px] md:h-[4px] bg-[#FFFEFD] rounded-full mb-[2px] shadow-xs" />
        </motion.div>
      </div>
    </div>
  );
}
