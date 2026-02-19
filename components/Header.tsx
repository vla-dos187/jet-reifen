import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { SectionId } from '../types';
import { BUSINESS_INFO } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: `#${SectionId.HOME}`, label: 'Home' },
    { href: `#${SectionId.LEISTUNGEN}`, label: 'Leistungen' },
    { href: `#${SectionId.TECH}`, label: 'Technik' },
    { href: `#${SectionId.RECHNER}`, label: 'Preisrechner' },
    { href: `#${SectionId.TERMIN}`, label: 'Termin' },
    { href: `#${SectionId.KONTAKT}`, label: 'Kontakt' },
    { href: `#${SectionId.FAQ}`, label: 'FAQ' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-jet-900/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand Link (Text only) */}
        <a 
          href={`#${SectionId.HOME}`} 
          onClick={(e) => handleNavClick(e, `#${SectionId.HOME}`)}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="text-2xl font-black italic tracking-tighter text-white leading-tight">
            <span className="text-brand-500">JET</span> REIFEN
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-bold text-gray-300 hover:text-brand-500 transition-colors uppercase tracking-widest cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a 
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-brand-500/20"
          >
            <Phone size={16} />
            <span className="text-sm">{BUSINESS_INFO.phone}</span>
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="xl:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menü öffnen"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-jet-900 border-t border-white/5 p-6 flex flex-col gap-4 shadow-2xl xl:hidden animate-fade-in-up">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-200 text-lg font-bold py-3 border-b border-white/5 cursor-pointer hover:text-brand-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a 
            href={`tel:${BUSINESS_INFO.phone}`}
            className="bg-brand-500 text-white text-center py-4 rounded-xl font-bold mt-2 shadow-lg shadow-brand-500/20"
          >
            Jetzt anrufen
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;