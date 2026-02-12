import React from 'react';
import { SectionId } from '../types';
import { Wrench, Warehouse, Disc, Recycle, ThermometerSnowflake, ShoppingBag, Hammer, MessageSquare } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Wrench size={40} />,
      title: "Reifenmontage & Wuchten",
      desc: "Professionelle Montage auf Stahl- oder Alufelgen inkl. elektronischem Feinwuchten für laufruhiges Fahren."
    },
    {
      icon: <ShoppingBag size={40} />,
      title: "Reifenverkauf",
      desc: "Wir bieten Neureifen aller namhaften Hersteller und in sämtlichen Dimensionen zu fairen Konditionen an."
    },
    {
      icon: <Hammer size={40} />,
      title: "Reifenreparatur",
      desc: "Nagel im Reifen? Wir prüfen und reparieren Ihre Reifen fachgerecht nach gesetzlichen Vorgaben."
    },
    {
      icon: <Warehouse size={40} />,
      title: "Reifeneinlagerung",
      desc: "Schluss mit Schleppen. Wir lagern Ihre Räder fachgerecht, trocken und sicher in unserem Reifenhotel."
    },
    {
      icon: <Disc size={40} />,
      title: "Radwechsel",
      desc: "Saisonaler Radwechsel (Sommer/Winter) schnell und unkompliziert. Inklusive Luftdruck- und Sichtprüfung."
    },
    {
      icon: <ThermometerSnowflake size={40} />,
      title: "Klimaservice (R134a & R1234yf)",
      desc: "Wartung, Befüllung und präzise Lecksuche mit Stickstoff für alle gängigen Kältemittel."
    },
    {
      icon: <Recycle size={40} />,
      title: "Altreifenentsorgung",
      desc: "Wir entsorgen Ihre abgefahrenen Reifen umweltgerecht und nach gesetzlichen Vorschriften."
    },
    {
      icon: <MessageSquare size={40} />,
      title: "Beratung / Sonstiges",
      desc: "Individuelle Beratung zu Felgen, Reifen und Fahrverhalten sowie weitere Werkstatt-Services auf Anfrage."
    }
  ];

  return (
    <section id={SectionId.LEISTUNGEN} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black italic text-jet-900 uppercase mb-4">
            Unsere Leistungen
          </h2>
          <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Alles rund um's Rad und mehr. Wir arbeiten mit modernster Technik und geschultem Personal für Ihre Sicherheit auf der Straße.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all group hover:-translate-y-1">
              <div className="text-brand-500 mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-jet-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;