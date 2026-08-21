import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-[#F5F3EA] w-full max-w-4xl rounded-3xl md:rounded-4xl shadow-2xl overflow-hidden z-10 border border-black/10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-black/10 bg-white/70 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${project.bgBadge} text-[#252525]`}>
                {project.category}
              </span>
              <span className="text-xs font-bold text-neutral-500 uppercase">
                {project.tool} • {project.year}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            {/* Title & Headline */}
            <div>
              <h3 className="text-3xl sm:text-5xl font-black text-[#252525] uppercase tracking-tight mb-4">
                {project.title}
              </h3>
              <p className="text-base sm:text-lg text-neutral-700 font-medium leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Main Mockup Image */}
            <div className="w-full rounded-2xl overflow-hidden bg-white border border-black/10 shadow-lg group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Deliverables & Client Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/10">
              <div className="bg-white/80 p-5 rounded-2xl border border-black/5">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Client</p>
                <p className="text-base font-bold text-[#252525]">{project.client}</p>
              </div>
              <div className="bg-white/80 p-5 rounded-2xl border border-black/5">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Timeline</p>
                <p className="text-base font-bold text-[#252525]">{project.timeline}</p>
              </div>
              <div className="bg-white/80 p-5 rounded-2xl border border-black/5">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Live URL</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-blue-600 flex items-center gap-1 hover:underline"
                >
                  <span>{project.displayUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Deliverables Badges */}
            <div>
              <h4 className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-3">Key Deliverables</h4>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-bold text-[#252525]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CTA in Modal */}
            <div className="flex justify-end gap-3 pt-4 border-t border-black/10">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-black/5 text-neutral-700 hover:bg-black/10 transition-colors"
              >
                Close
              </button>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#252525] text-white hover:bg-black transition-all shadow-md hover:scale-105"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
