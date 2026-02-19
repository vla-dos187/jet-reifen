import React, { useState } from 'react';
import { SectionId } from '../types';
import { Cpu, Zap, Activity, ShieldCheck, Settings, Wrench } from 'lucide-react';

const TechSection: React.FC = () => {
  const [imgErrors, setImgErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (id: string) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const MachineImage = ({ src, alt, label, id, Icon }: { src: string, alt: string, label: string, id: string, Icon: React.ElementType }) => (
    <div className="aspect-video bg-[radial-gradient(circle,_#1a1a1a_0%,_#000000_100%)] rounded-2xl border border-orange-500/30 overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.1)] group relative flex items-center justify-center p-4">
      {/* Placeholder Icon (Visible if image fails or is loading) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Icon size={48} className="text-orange-500/10 animate-pulse" />
      </div>

      {!imgErrors[id] && (
        <img 
          src={src} 
          alt={alt} 
          onError={() => handleImageError(id)}
          className="max-w-full max-h-full object-contain transition-all duration-700 opacity-90 group-hover:opacity-100 group-hover:scale-110 relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        />
      )}
      
      {/* Subtle Corner Badge */}
      <div className="absolute bottom-5 right-5 z-30">
         <div className="bg-black/60 backdrop-blur-md text-white/50 px-4 py-1.5 rounded-full border border-white/5 font-bold italic tracking-widest uppercase text-[9px] shadow-lg">
           {label}
         </div>
      </div>
    </div>
  );

  return (
    <section id={SectionId.TECH} className="py-24 bg-jet-900 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-brand-500 font-bold uppercase tracking-widest text-sm">Präzision ohne Kompromisse</span>
          <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase mt-4 mb-6">
            Unsere High-End Technik
          </h2>
          <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
          <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg">
            Wir investieren in die weltbeste Technologie von <span className="text-white font-bold">Hunter Engineering</span>, 
            um Ihren Fahrzeugen eine Behandlung auf höchstem Niveau zu garantieren.
          </p>
        </div>

        <div className="space-y-24">
          {/* Machine 1: Hunter Revolution */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-brand-500 font-bold">
                <Cpu size={20} />
                <span>Hunter Revolution™ mit Walk-Away™</span>
              </div>
              <h3 className="text-3xl font-bold text-white">Vollautomatisch. Felgenschonend. Perfekt.</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Die Revolution™ ist die weltweit erste vollautomatische Montiermaschine. Durch die <span className="text-white font-medium">Walk-Away™-Technologie</span> führt die Maschine den Montageprozess autonom durch. 
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="text-brand-500 mt-1 shrink-0" size={20} />
                  <span className="text-gray-300"><span className="text-white font-bold">Null-Kontakt-Technik:</span> Absolut sicher für empfindliche Alufelgen, da kein Hebeleisen mehr benötigt wird.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="text-brand-500 mt-1 shrink-0" size={20} />
                  <span className="text-gray-300"><span className="text-white font-bold">Höchste Präzision:</span> Jeder Reifen wird mit identischer, computergesteuerter Sorgfalt montiert.</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <MachineImage 
                id="revolution"
                src="/images/hunter-revolution.png" 
                alt="Hunter Revolution Montiermaschine" 
                label="Walk-Away™ Technology"
                Icon={Settings}
              />
            </div>
          </div>

          {/* Machine 2: Hunter Road Force Elite */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <MachineImage 
                id="roadforce"
                src="/images/hunter-roadforce.png" 
                alt="Hunter Road Force Elite Wuchtmaschine" 
                label="Road Force® Elite"
                Icon={Activity}
              />
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-brand-500 font-bold">
                <Zap size={20} />
                <span>Hunter Road Force® Elite</span>
              </div>
              <h3 className="text-3xl font-bold text-white">Mehr als nur Wuchten. Eine Fahrsimulation.</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Die Road Force® Elite ist die fortschrittlichste Wuchtmaschine der Welt. Sie simuliert eine <span className="text-white font-medium">echte Straßenfahrt</span> durch eine Belastungswalze (Straßenkraft-Messung).
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Activity className="text-brand-500 mt-1 shrink-0" size={20} />
                  <span className="text-gray-300"><span className="text-white font-bold">Vibrations-Eliminierung:</span> Erkennt Rundlauffehler und Kraftschwankungen, die normales Wuchten nicht findet.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="text-brand-500 mt-1 shrink-0" size={20} />
                  <span className="text-gray-300"><span className="text-white font-bold">Match-Mounting:</span> Die Maschine ermittelt die optimale Position des Reifens auf der Felge für maximale Laufruhe.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action for Tech */}
        <div className="mt-24 p-8 bg-white/5 border border-white/10 rounded-2xl text-center backdrop-blur-sm">
           <h4 className="text-xl font-bold text-white mb-2">Erleben Sie den Unterschied</h4>
           <p className="text-gray-400">Keine Vibrationen, kein Flattern am Lenkrad – nur purer Fahrspaß durch High-End Diagnose.</p>
        </div>
      </div>
    </section>
  );
};

export default TechSection;