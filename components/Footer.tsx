import React from 'react';
import { BUSINESS_INFO } from '../constants';

interface FooterProps {
  onOpenImpressum: () => void;
  onOpenDatenschutz: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenImpressum, onOpenDatenschutz }) => {
  return (
    <footer className="bg-jet-900 text-gray-500 py-16 border-t border-white/5">
      <div className="container mx-auto px-4 text-center">
        {/* Footer Brand (Text only) */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-3xl font-black italic text-white tracking-tighter mb-4">
            <span className="text-brand-500">JET</span> REIFEN
          </div>
        </div>

        <p className="mb-6 text-gray-400 max-w-md mx-auto leading-relaxed">
          <strong>{BUSINESS_INFO.name}</strong><br />
          {BUSINESS_INFO.address}<br />
          {BUSINESS_INFO.zipCity}
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-medium uppercase tracking-widest">
          <button 
            onClick={onOpenImpressum}
            className="hover:text-brand-500 transition-colors focus:outline-none"
          >
            Impressum
          </button>
          <button 
            onClick={onOpenDatenschutz}
            className="hover:text-brand-500 transition-colors focus:outline-none"
          >
            Datenschutz
          </button>
        </div>

        <div className="pt-8 border-t border-white/5">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Jet Reifen-Service. Alle Rechte vorbehalten. Designed for performance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;