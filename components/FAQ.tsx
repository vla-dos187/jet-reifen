import React, { useState } from 'react';
import { SectionId } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Muss ich einen Termin vereinbaren?",
      a: "Wir empfehlen dringend eine Terminbuchung, um Wartezeiten zu vermeiden. Spontane Besuche sind möglich, aber mit Wartezeit verbunden."
    },
    {
      q: "Wie lange dauert ein Reifenwechsel?",
      a: "Ein kompletter Radwechsel dauert bei uns in der Regel ca. 20-30 Minuten. Bei Neureifenmontage und Wuchten rechnen Sie bitte mit ca. 45-60 Minuten."
    },
    {
      q: "Welche Klimaanlagen können Sie befüllen?",
      a: "Wir warten und befüllen Anlagen mit dem klassischen Kältemittel R134a sowie dem neuen R1234yf. Zudem führen wir eine fachgerechte Lecksuche mittels Stickstoff-Druckprüfung durch, um Undichtigkeiten sicher aufzuspüren."
    },
    {
      q: "Kann ich meine Reifen bei Ihnen einlagern?",
      a: "Ja, wir bieten ein Reifenhotel. Ihre Räder werden fachgerecht gelagert, versichert und vor der nächsten Saison geprüft."
    },
    {
      q: "Welche Zahlungsmethoden akzeptieren Sie?",
      a: "Sie können bei uns bequem mit EC-Karte oder in Bar bezahlen."
    }
  ];

  return (
    <section id={SectionId.FAQ} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-black italic text-center text-jet-900 uppercase mb-12">
          Häufige Fragen
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-lg text-jet-900">{faq.q}</span>
                {openIndex === index ? <ChevronUp className="text-brand-500" /> : <ChevronDown className="text-gray-400" />}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out px-6 ${
                  openIndex === index ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;