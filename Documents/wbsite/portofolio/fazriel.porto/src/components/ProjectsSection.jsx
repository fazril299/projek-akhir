import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projectsData';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectsSection({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Branding & Website', 'Website Design', 'Branding', 'Brand Identity'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory || p.category.includes(activeCategory));

  return (
    <section id="project" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F3EA] relative">
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
              <span>Projects</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-[#252525] tracking-tight leading-none"
              style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
            >
              Projects That Tell Stories
            </motion.h2>
          </div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-[#252525] text-white shadow-sm'
                    : 'bg-white text-neutral-600 border border-black/5 hover:border-black/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid — matches Framer's layout: 2 columns, large image canvas */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => onSelectProject(project)}
                className="group bg-white rounded-3xl border border-black/5 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
              >
                {/* Project Mockup — large image area like Framer */}
                <div className="w-full aspect-[16/10] bg-[#F5F3EA] relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2 rounded-full bg-white text-[#252525] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 sm:p-7 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase ${project.bgBadge} text-[#252525]`}>
                        {project.category}
                      </span>
                      <span className="text-xs font-semibold text-neutral-400">
                        {project.tool} · {project.year}
                      </span>
                    </div>
                    <h3
                      className="text-2xl font-black text-[#252525] uppercase tracking-tight group-hover:text-black transition-colors"
                      style={{ fontFamily: '"Mona Sans", "Plus Jakarta Sans", sans-serif' }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div className="w-11 h-11 rounded-full bg-[#F5F3EA] group-hover:bg-[#252525] group-hover:text-white transition-colors flex items-center justify-center flex-shrink-0 ml-4">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
