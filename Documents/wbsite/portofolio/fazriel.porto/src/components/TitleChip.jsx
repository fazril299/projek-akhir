import React from 'react';
import { motion } from 'framer-motion';

/**
 * Recreates the exact Framer "Title-Chip" badge:
 * - Rounded note background with drop shadow
 * - Peeled / folded top-right flap with colored underside
 * - Circular icon badge with white border and drop shadow
 * - Metallic colored paperclip overlapping the top-left edge
 */
export default function TitleChip({
  label = 'Illustration',
  variant = 'pink', // 'pink' | 'green' | 'blue' | 'purple'
  icon = 'pen', // 'pen' | 'layers'
  className = '',
  style = {},
  drag = true,
}) {
  const themes = {
    pink: {
      bg: 'bg-[#F4EAF5]',
      accent: 'rgb(236, 104, 253)',
      clipColor: 'rgb(236, 104, 253)',
      badgeBg: 'bg-[#EC68FD]',
    },
    green: {
      bg: 'bg-[#F4F8E8]',
      accent: 'rgb(147, 186, 6)',
      clipColor: 'rgb(147, 186, 6)',
      badgeBg: 'bg-[#93BA06]',
    },
    blue: {
      bg: 'bg-[#E5F2FA]',
      accent: 'rgb(3, 156, 251)',
      clipColor: 'rgb(3, 156, 251)',
      badgeBg: 'bg-[#039CFB]',
    },
    purple: {
      bg: 'bg-[#F1EEFC]',
      accent: 'rgb(129, 104, 253)',
      clipColor: 'rgb(129, 104, 253)',
      badgeBg: 'bg-[#8168FD]',
    },
  };

  const theme = themes[variant] || themes.pink;

  return (
    <motion.div
      drag={drag}
      dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center select-none cursor-grab active:cursor-grabbing ${className}`}
      style={style}
    >
      {/* Main Tag Container */}
      <div
        className={`${theme.bg} rounded-[8px] pl-10 pr-6 py-2.5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] relative border border-black/5 flex items-center justify-center`}
      >
        {/* Peeled / Folded Corner on Top-Right */}
        <div className="absolute -top-[1px] -right-[1px] w-[18px] h-[18px] pointer-events-none overflow-visible">
          <svg
            viewBox="0 0 18.109 18.301"
            className="w-[18px] h-[18px] overflow-visible"
          >
            <g>
              {/* Shadow under fold */}
              <path
                d="M 2.03 2.5 L 18.109 13.94 L 3.804 14.25 C 1.323 14.304 -0.515 11.96 0.13 9.564 Z"
                fill="rgb(0,0,0)"
                opacity="0.25"
              />
              {/* Colored Underside */}
              <path
                d="M 2 2.501 L 18.079 13.941 L 7.104 18.06 C 4.68 18.97 2.092 17.188 2.075 14.6 L 2 2.5 Z"
                fill={theme.accent}
              />
              {/* Dark Crease Flap */}
              <path
                d="M 18.08 13.76 L 2 2.32 L 15.76 0 Z"
                fill="rgb(33, 33, 33)"
              />
            </g>
          </svg>
        </div>

        {/* Tag Label Text */}
        <span className="font-semibold text-[15px] sm:text-[17px] text-[#212121] tracking-tight whitespace-nowrap">
          {label}
        </span>
      </div>

      {/* Circular Pin Icon Badge (Positioned at Top-Left) */}
      <div
        className={`absolute -top-3 -left-3.5 w-9 h-9 ${theme.badgeBg} rounded-full border-[2px] border-white flex items-center justify-center shadow-[-2px_3px_6px_rgba(0,0,0,0.22)] z-20`}
      >
        {icon === 'pen' ? (
          /* Pen Tool / Nib Icon */
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="1.5" />
          </svg>
        ) : icon === 'box' ? (
          /* 3D Box / Cube Icon */
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        ) : (
          /* Layers / UI/UX Icon */
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        )}
      </div>

      {/* Metallic Colored Paperclip (Overlapping near the badge) */}
      <div className="absolute -top-2 left-4 w-6 h-6 pointer-events-none z-10">
        {/* Paperclip Shadow */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 absolute top-[1px] left-0 text-black/25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 11.224 4.5 L 3.414 12.44 C 2.843 13.028 2.85 13.966 3.43 14.546 C 4.009 15.125 4.947 15.132 5.535 14.561 L 14.846 5.122 C 16.017 3.95 16.017 2.05 14.846 0.879 C 13.674 -0.293 11.774 -0.293 10.603 0.879 L 1.292 10.318 C -0.441 12.08 -0.429 14.909 1.318 16.656 C 3.065 18.404 5.895 18.415 7.656 16.682 L 15.349 9" />
        </svg>

        {/* Paperclip Stroke */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 absolute top-0 left-0"
          fill="none"
          stroke={theme.clipColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 11.224 4.5 L 3.414 12.44 C 2.843 13.028 2.85 13.966 3.43 14.546 C 4.009 15.125 4.947 15.132 5.535 14.561 L 14.846 5.122 C 16.017 3.95 16.017 2.05 14.846 0.879 C 13.674 -0.293 11.774 -0.293 10.603 0.879 L 1.292 10.318 C -0.441 12.08 -0.429 14.909 1.318 16.656 C 3.065 18.404 5.895 18.415 7.656 16.682 L 15.349 9" />
        </svg>
      </div>
    </motion.div>
  );
}
