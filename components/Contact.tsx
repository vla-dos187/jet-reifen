import React from 'react';
import { SectionId } from '../types';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, OPENING_HOURS } from '../constants';

const Contact: React.FC = () => {
  const handleRoutePlanning = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const destination = "Mercedesstraße 3, 76571 Gaggenau";
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&origin=${latitude},${longitude}`;
          window.open(url, '_blank', 'noopener,noreferrer');
        },
        () => {
          // Fallback if user denies or error occurs: Just open maps with destination
          window.open(BUSINESS_INFO.googleMapsUrl, '_blank', 'noopener,noreferrer');
        },
        { timeout: 5000 }
      );
    } else {
      window.open(BUSINESS_INFO.googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id={SectionId.KONTAKT} className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black italic text-jet-900 uppercase mb-8">
              Kontakt & Anfahrt
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-brand-500/10 p-3 rounded-lg h-fit text-brand-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-jet-900 mb-1">Adresse</h4>
                  <p className="text-gray-600">
                    {BUSINESS_INFO.name}<br />
                    {BUSINESS_INFO.address}<br />
                    {BUSINESS_INFO.zipCity}
                  </p>
                  <button 
                    onClick={handleRoutePlanning}
                    className="text-brand-500 font-bold text-sm mt-2 inline-block hover:underline focus:outline-none"
                  >
                    Route planen &rarr;
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-500/10 p-3 rounded-lg h-fit text-[#25D366]">
                  <MessageCircle size={24} fill="#25D366" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-jet-900 mb-1">Schneller Kontakt</h4>
                  <p className="text-gray-600 mb-2">Per Telefon oder WhatsApp:</p>
                  <div className="flex flex-col gap-3">
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="text-xl font-bold text-jet-900 hover:text-brand-500 transition-colors flex items-center gap-2">
                      <Phone size={18} /> {BUSINESS_INFO.phone}
                    </a>
                    <a 
                      href={BUSINESS_INFO.whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white px-4 py-2 rounded-lg font-bold inline-flex items-center gap-2 hover:bg-[#1ebd59] transition-colors w-fit"
                    >
                      <MessageCircle size={18} fill="white" /> WhatsApp schreiben
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-brand-500/10 p-3 rounded-lg h-fit text-brand-600">
                  <Clock size={24} />
                </div>
                <div className="w-full max-w-xs">
                  <h4 className="font-bold text-lg text-jet-900 mb-2">Öffnungszeiten</h4>
                  <ul className="space-y-2">
                    {OPENING_HOURS.map((oh, i) => (
                      <li key={i} className="flex justify-between text-gray-600 border-b border-gray-100 pb-1 last:border-0">
                        <span>{oh.day}</span>
                        <span className="font-medium text-jet-900">{oh.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-80 md:h-full relative shadow-inner">
             <iframe 
               width="100%" 
               height="100%" 
               style={{border:0}}
               loading="lazy" 
               allowFullScreen
               referrerPolicy="no-referrer-when-downgrade"
               title="Standort Jet Reifen-Service"
               className="grayscale hover:grayscale-0 transition-all duration-500"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.7!2d8.3!3d48.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQ4JzAwLjAiTiA4wrAxOCcwMC4wIkU!5e0!3m2!1sde!2sde!4v1600000000000!5m2!1sde!2sde">
             </iframe> 
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;