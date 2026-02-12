import React from 'react';
import { SectionId } from '../types';
import { Star, MapPin, Clock, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center bg-jet-900 pt-20 overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-jet-800 skew-x-[-12deg] translate-x-20 z-0"></div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Content */}
        <div className="text-white space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-sm font-medium">{BUSINESS_INFO.rating} Sterne ({BUSINESS_INFO.reviews} Rezensionen)</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black italic tracking-tight leading-none">
            SCHNELL.<br />
            FAIR.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-400">
              KOMPETENT.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-lg">
            Ihr Profi-Reifenservice in Gaggenau. Wir sorgen für sichere Fahrt – von der Montage bis zur Einlagerung. Ohne lange Wartezeiten.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href={`#${SectionId.TERMIN}`}
              onClick={(e) => handleNavClick(e, `#${SectionId.TERMIN}`)}
              className="bg-brand-500 hover:bg-brand-600 text-white text-center px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-1 cursor-pointer flex items-center gap-2"
            >
              <Calendar size={22} />
              Termin buchen
            </a>
            <a 
              href={`#${SectionId.RECHNER}`}
              onClick={(e) => handleNavClick(e, `#${SectionId.RECHNER}`)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-center px-8 py-4 rounded-lg font-bold text-lg backdrop-blur-sm transition-all hover:-translate-y-1 cursor-pointer"
            >
              Preis berechnen
            </a>
          </div>

          <div className="flex items-center gap-6 pt-8 text-sm text-gray-500 border-t border-gray-800">
             <div className="flex items-center gap-2">
                <MapPin size={18} className="text-brand-500" />
                <span>{BUSINESS_INFO.address}, {BUSINESS_INFO.zipCity}</span>
             </div>
             <div className="hidden sm:flex items-center gap-2">
                <Clock size={18} className="text-brand-500" />
                <span>Mo-Fr 09:00 - 16:30</span>
             </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-full min-h-[400px] flex items-center justify-center lg:justify-end">
          <img 
            src="/images/hero-mercedes.webp" 
            alt="Fahrzeug im Profil" 
            className="w-full max-w-2xl object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;