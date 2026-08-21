import React, { useState } from 'react';
import Hero from './components/Hero';
import AboutBento from './components/AboutBento';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F3EA] text-[#252525] relative selection:bg-[#FEDCDD]">
      {/* Main Content Sections */}
      <main id="home">
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <AboutBento onOpenContact={() => setIsContactOpen(true)} />
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

      {/* Footer & Global CTA */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
