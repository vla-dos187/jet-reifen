import React, { useState, useEffect } from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface CookieBannerProps {
  onConsentChange: (consent: boolean) => void;
  onOpenDatenschutz: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onConsentChange, onOpenDatenschutz }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === null) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    onConsentChange(true);
    setIsVisible(false);
  };

  const handleNecessaryOnly = () => {
    onConsentChange(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] p-4 md:p-8 animate-fade-in-up">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-jet-900 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-xl bg-opacity-95">
          
          <div className="flex items-start gap-6 flex-1">
            <div className="bg-brand-500/10 p-4 rounded-2xl shrink-0 hidden sm:block">
              <ShieldCheck size={32} className="text-brand-500" />
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-black italic uppercase tracking-tighter text-xl">Datenschutz & Services</h4>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                Wir nutzen Cookies und externe Dienste (wie Google Kalender), um Ihnen das beste Erlebnis auf unserer Seite zu bieten. 
                Einige sind technisch notwendig, andere helfen uns, unseren Service zu verbessern.
              </p>
              <button 
                onClick={onOpenDatenschutz}
                className="flex items-center gap-2 text-[10px] text-gray-500 hover:text-brand-500 transition-colors font-bold uppercase tracking-widest focus:outline-none"
              >
                <Info size={12} />
                <span>Mehr Informationen in unserer Datenschutzerklärung</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            <button 
              onClick={handleNecessaryOnly}
              className="bg-jet-800 hover:bg-jet-700 text-gray-300 font-bold py-4 px-8 rounded-xl transition-all active:scale-95 border border-white/5 order-2 sm:order-1"
            >
              Nur notwendige
            </button>
            <button 
              onClick={handleAcceptAll}
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 px-10 rounded-xl transition-all hover:scale-[1.03] active:scale-95 shadow-xl shadow-brand-500/20 whitespace-nowrap order-1 sm:order-2"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default CookieBanner;