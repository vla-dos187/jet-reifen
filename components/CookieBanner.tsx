import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after a short delay for better UX
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setIsVisible(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] p-4 md:p-6 animate-fade-in-up">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-jet-900 border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md bg-opacity-95">
          <div className="flex-1 text-center md:text-left">
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              Wir nutzen Cookies, um Ihre Erfahrung zu verbessern und unseren Service zu optimieren. 
              Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.
            </p>
          </div>
          <div className="shrink-0">
            <button 
              onClick={handleAccept}
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20 whitespace-nowrap"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default CookieBanner;