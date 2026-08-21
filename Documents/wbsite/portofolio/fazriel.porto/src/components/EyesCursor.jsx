import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';

export default function EyesCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  const containerRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });

  // Spring physics for trailing position behind cursor
  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const smoothX = useSpring(targetX, { stiffness: 400, damping: 28, mass: 0.5 });
  const smoothY = useSpring(targetY, { stiffness: 400, damping: 28, mass: 0.5 });

  // Spring physics for pupil offset (gaze direction)
  const targetPupilX = useMotionValue(0);
  const targetPupilY = useMotionValue(0);
  const smoothPupilX = useSpring(targetPupilX, { stiffness: 350, damping: 25 });
  const smoothPupilY = useSpring(targetPupilY, { stiffness: 350, damping: 25 });

  // Periodic Blink Animation (every 4 seconds)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 130);
    }, 4000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Listen to global mouse movement
  useEffect(() => {
    let idleTimer = null;

    const handlePointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Compute velocity
      velocity.current = {
        x: x - prevMousePos.current.x,
        y: y - prevMousePos.current.y,
      };

      prevMousePos.current = { x, y };
      mousePos.current = { x, y };

      // Set target position for the floating eye badge (offset from cursor)
      targetX.set(x + 20);
      targetY.set(y + 14);

      // Reset idle timer
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        velocity.current = { x: 0, y: 0 };
      }, 100);
    };

    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0]);
      }
    }, { passive: true });

    document.addEventListener('mouseleave', handlePointerLeave);
    document.addEventListener('mouseenter', handlePointerEnter);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('mouseenter', handlePointerEnter);
      clearTimeout(idleTimer);
    };
  }, [isVisible, targetX, targetY]);

  // Frame-by-frame gaze update based on real container position vs mouse lead
  useAnimationFrame(() => {
    if (!containerRef.current || !isVisible) return;

    const rect = containerRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    // Vector from trailing eye to current mouse pointer
    const leadDx = mousePos.current.x - eyeCenterX;
    const leadDy = mousePos.current.y - eyeCenterY;

    // Velocity vector
    const vx = velocity.current.x;
    const vy = velocity.current.y;

    // Combined gaze vector (both lead distance & instantaneous velocity)
    const combinedX = leadDx * 0.35 + vx * 0.75;
    const combinedY = leadDy * 0.35 + vy * 0.75;
    const dist = Math.hypot(combinedX, combinedY);

    if (dist > 1.5) {
      const angle = Math.atan2(combinedY, combinedX);
      const maxTravel = 6.5; // Max displacement inside sclera
      const travel = Math.min(maxTravel, dist / 4);

      targetPupilX.set(Math.cos(angle) * travel);
      targetPupilY.set(Math.sin(angle) * travel);
    } else {
      // Return to center when mouse stops
      targetPupilX.set(0);
      targetPupilY.set(0);
    }
  });

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
      style={{
        x: smoothX,
        y: smoothY,
        opacity: isVisible ? 1 : 0,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
    >
      {/* 2 White Capsule Eyes */}
      <div className="flex items-center gap-[6px] rotate-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
        
        {/* Left Eye (24px x 36px) */}
        <div
          className={`w-[24px] h-[36px] bg-[#FFFEFD] rounded-[40px] relative overflow-hidden flex items-center justify-center border border-black/5 shadow-xs transition-transform duration-100 ease-out ${
            isBlinking ? 'scale-y-[0.1]' : 'scale-y-100'
          }`}
          style={{ transformOrigin: 'center' }}
        >
          {/* Pupil (16px x 22px) */}
          <motion.div
            className="w-[16px] h-[22px] bg-[#0C0C0C] rounded-full absolute flex flex-col items-center justify-end pb-[2px] shadow-sm"
            style={{
              x: smoothPupilX,
              y: smoothPupilY,
            }}
          >
            {/* White Reflection Dot (3px x 3px) */}
            <div className="w-[3px] h-[3px] bg-[#FFFEFD] rounded-full mb-[2px] shadow-xs" />
          </motion.div>
        </div>

        {/* Right Eye (24px x 36px) */}
        <div
          className={`w-[24px] h-[36px] bg-[#FFFEFD] rounded-[40px] relative overflow-hidden flex items-center justify-center border border-black/5 shadow-xs transition-transform duration-100 ease-out ${
            isBlinking ? 'scale-y-[0.1]' : 'scale-y-100'
          }`}
          style={{ transformOrigin: 'center' }}
        >
          {/* Pupil (16px x 22px) */}
          <motion.div
            className="w-[16px] h-[22px] bg-[#0C0C0C] rounded-full absolute flex flex-col items-center justify-end pb-[2px] shadow-sm"
            style={{
              x: smoothPupilX,
              y: smoothPupilY,
            }}
          >
            {/* White Reflection Dot (3px x 3px) */}
            <div className="w-[3px] h-[3px] bg-[#FFFEFD] rounded-full mb-[2px] shadow-xs" />
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
