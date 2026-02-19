import React, { useState, useEffect, useMemo } from 'react';
import { SectionId, CalculatorState } from '../types.ts';
import { PRICING_DATA, EXTRAS_PRICE } from '../constants.ts';
import { 
  Car, Bike, Truck, Info, Disc, Wrench, 
  Trash2, Warehouse, ThermometerSnowflake, CheckCircle2, Cpu
} from 'lucide-react';

interface CalculatorProps {
  onBookNow: (data: Partial<CalculatorState> & { estimatedPrice: number; summary: string }) => void;
}

const PriceCalculator: React.FC<CalculatorProps> = ({ onBookNow }) => {
  const [state, setState] = useState<CalculatorState>({
    serviceMode: 'montage',
    vehicleCategory: 'pkw',
    rimType: 'alu',
    rimSizeId: 'pkw-a-12-16',
    quantity: 4,
    onVehicle: false,
    wantsDisposal: true,
    wantsStorage: false,
    wantsKlimaservice: false,
    wantsTPMS: false,
  });

  const availableSizes = useMemo(() => {
    if (state.serviceMode === 'radwechsel') return [];
    const catData = PRICING_DATA.montage[state.vehicleCategory as keyof typeof PRICING_DATA.montage];
    return (catData as any)[state.rimType] || [];
  }, [state.serviceMode, state.vehicleCategory, state.rimType]);

  useEffect(() => {
    if (availableSizes.length > 0 && !availableSizes.find((s: any) => s.id === state.rimSizeId)) {
      setState(prev => ({ ...prev, rimSizeId: availableSizes[0].id }));
    }
  }, [availableSizes, state.rimSizeId]);

  const calculation = useMemo(() => {
    let total = 0;
    let summaryParts: string[] = [];

    if (state.serviceMode === 'montage') {
      const sizeObj = availableSizes.find((s: any) => s.id === state.rimSizeId);
      const basePrice = sizeObj ? sizeObj.price : 0;
      const subtotal = basePrice * state.quantity;
      total += subtotal;
      summaryParts.push(`${state.quantity}x Montage (${sizeObj?.label || ''}): ${subtotal.toFixed(2)}€`);
      
      // Additional fee for "on vehicle" (De- und Montage am Fahrzeug)
      if (state.onVehicle) {
        const vehicleFee = state.quantity === 1 ? 5 : state.quantity === 2 ? 10 : 20;
        total += vehicleFee;
        summaryParts.push(`Fahrzeugmontage-Pauschale: ${vehicleFee.toFixed(2)}€`);
      }
    } else {
      const basePrice = PRICING_DATA.radwechsel[state.vehicleCategory as keyof typeof PRICING_DATA.radwechsel] || 0;
      total += basePrice;
      summaryParts.push(`Radwechsel komplett (${state.vehicleCategory.toUpperCase()}): ${basePrice.toFixed(2)}€`);
    }

    if (state.wantsDisposal) {
      const cost = EXTRAS_PRICE.disposal * state.quantity;
      total += cost;
      summaryParts.push(`${state.quantity}x Entsorgung: ${cost.toFixed(2)}€`);
    }

    if (state.wantsStorage) {
      total += EXTRAS_PRICE.storage;
      summaryParts.push(`Reifeneinlagerung (Saison): ${EXTRAS_PRICE.storage.toFixed(2)}€`);
    }

    if (state.wantsKlimaservice) {
      total += EXTRAS_PRICE.klimaservice;
      summaryParts.push(`Klimaservice Basis: ${EXTRAS_PRICE.klimaservice.toFixed(2)}€`);
    }

    if (state.wantsTPMS) {
      const cost = EXTRAS_PRICE.tpms * state.quantity;
      total += cost;
      summaryParts.push(`${state.quantity}x RDKS-Sensoren (Einbau/Einlernen): ${cost.toFixed(2)}€`);
    }

    return { total, summary: summaryParts.join('\n') };
  }, [state, availableSizes]);

  const updateState = (key: keyof CalculatorState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const handleToggle = (key: keyof CalculatorState) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id={SectionId.RECHNER} className="py-24 bg-jet-900 text-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* LEFT COLUMN: Info & Title */}
          <div className="flex flex-col justify-center space-y-8 animate-fade-in-up">
            <div>
              <div className="inline-flex items-center gap-2 text-brand-500 font-bold text-xs uppercase tracking-widest mb-4">
                <span className="p-1 bg-brand-500/20 rounded">📋</span> Transparente Preise 2024
              </div>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-6">
                WAS KOSTET<br />IHR SERVICE?
              </h2>
              <p className="text-gray-400 text-lg max-w-md">
                Kalkulieren Sie Ihren Service in Echtzeit basierend auf Felgentyp und Fahrzeugkategorie.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-jet-800/50 p-6 rounded-xl border border-white/5 flex gap-4">
                <div className="bg-brand-500/20 p-2 rounded h-fit">
                   <Disc className="text-brand-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Stahl vs. Alu</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Wir unterscheiden präzise zwischen Stahl- und Alufelgen, um Ihnen immer den fairsten Preis für den jeweiligen Montageaufwand zu bieten.
                  </p>
                </div>
              </div>

              <div className="bg-jet-800/50 p-6 rounded-xl border border-white/5 flex gap-4">
                <div className="bg-brand-500/20 p-2 rounded h-fit">
                   <Info className="text-brand-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Fahrzeugmontage</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    De- und Montage der Räder direkt am Fahrzeug: 5€ (1 Rad), 10€ (2 Räder), 20€ (4 Räder).
                  </p>
                </div>
              </div>
            </div>

            <ul className="space-y-3 pt-4">
              {[
                "Inklusive neuer Gummiventile",
                "Inklusive Feinwuchten",
                "Klimaservice ab 80,00 €",
                "RDKS-Service (Sensoren)"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                  <CheckCircle2 size={16} className="text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: Calculator Form */}
          <div className="bg-jet-800/40 p-1 md:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm animate-fade-in-up">
            <div className="space-y-8 p-4 md:p-0">
              
              {/* Service Art */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Service-Art</label>
                <div className="grid grid-cols-2 gap-2 bg-jet-900/50 p-1 rounded-lg border border-white/5">
                  <button 
                    onClick={() => updateState('serviceMode', 'montage')}
                    className={`py-2 px-4 rounded-md text-xs font-bold transition-all ${state.serviceMode === 'montage' ? 'bg-brand-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    Reifenmontage
                  </button>
                  <button 
                    onClick={() => updateState('serviceMode', 'radwechsel')}
                    className={`py-2 px-4 rounded-md text-xs font-bold transition-all ${state.serviceMode === 'radwechsel' ? 'bg-brand-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    Radwechsel
                  </button>
                </div>
              </div>

              {/* Vehicle Category */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Fahrzeugtyp</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'pkw', icon: <Car size={18} />, label: 'PKW' },
                    { id: 'suv', icon: <Car size={18} />, label: 'SUV' },
                    { id: 'transporter', icon: <Truck size={18} />, label: 'Transp.' },
                    { id: 'moto', icon: <Bike size={18} />, label: 'Moto' }
                  ].map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => updateState('vehicleCategory', cat.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${state.vehicleCategory === cat.id ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-white/10 bg-jet-900/30 text-gray-500 hover:border-white/20'}`}
                    >
                      {cat.icon}
                      <span className="text-[8px] font-bold uppercase">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {state.serviceMode === 'montage' && (
                <>
                  {/* Rim Type */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Felgentyp</label>
                    <div className="grid grid-cols-2 gap-2 bg-jet-900/50 p-1 rounded-lg border border-white/5">
                      <button 
                        onClick={() => updateState('rimType', 'stahl')}
                        className={`py-2 px-4 rounded-md text-xs font-bold transition-all ${state.rimType === 'stahl' ? 'bg-slate-700 text-white shadow-lg' : 'text-gray-500'}`}
                      >
                        Stahlfelge
                      </button>
                      <button 
                        onClick={() => updateState('rimType', 'alu')}
                        className={`py-2 px-4 rounded-md text-xs font-bold transition-all ${state.rimType === 'alu' ? 'bg-slate-700 text-white shadow-lg' : 'text-gray-500'}`}
                      >
                        Alufelge
                      </button>
                    </div>
                  </div>

                  {/* Size & Quantity Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Felgengrösse</label>
                      <div className="relative">
                        <select 
                          value={state.rimSizeId}
                          onChange={(e) => updateState('rimSizeId', e.target.value)}
                          className="w-full bg-jet-900/80 border border-white/20 rounded-lg p-3 outline-none focus:ring-1 focus:ring-brand-500 text-xs font-bold appearance-none cursor-pointer"
                        >
                          {availableSizes.map((size: any) => (
                            <option key={size.id} value={size.id}>{size.label} ({size.price.toFixed(2)} €/Rad)</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                           <Wrench size={14} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Anzahl</label>
                      <div className="grid grid-cols-3 gap-1 bg-jet-900/50 p-1 rounded-lg border border-white/5">
                        {[1, 2, 4].map(num => (
                          <button 
                            key={num}
                            onClick={() => updateState('quantity', num)}
                            className={`py-2 rounded text-xs font-bold transition-all ${state.quantity === num ? 'bg-brand-500 text-white shadow-md' : 'text-gray-500 hover:text-white'}`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* On Vehicle Toggle */}
                  <div 
                    onClick={() => handleToggle('onVehicle')}
                    className={`p-4 rounded-lg border transition-all flex items-center gap-3 cursor-pointer ${state.onVehicle ? 'border-brand-500 bg-brand-500/5' : 'border-white/5 bg-jet-900/30'}`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${state.onVehicle ? 'bg-brand-500 border-brand-500' : 'border-gray-600'}`}>
                      {state.onVehicle && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold block">Räder am Fahrzeug montiert</span>
                      <span className="text-[9px] text-gray-500">De-/Montage Pauschale inkludiert</span>
                    </div>
                  </div>
                </>
              )}

              {/* Zusatzleistungen */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">Zusatzleistungen</label>
                <div className="space-y-2">
                  <div 
                    onClick={() => handleToggle('wantsKlimaservice')}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${state.wantsKlimaservice ? 'border-brand-500 bg-brand-500/5' : 'border-white/5 bg-jet-900/30'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${state.wantsKlimaservice ? 'bg-brand-500 border-brand-500' : 'border-gray-600'}`}>
                        {state.wantsKlimaservice && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <div className="flex items-center gap-2">
                         <ThermometerSnowflake size={14} className="text-blue-400" />
                         <span className="text-[11px] font-bold">Klimaservice</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">+{EXTRAS_PRICE.klimaservice.toFixed(2)} €</span>
                  </div>

                  <div 
                    onClick={() => handleToggle('wantsTPMS')}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${state.wantsTPMS ? 'border-brand-500 bg-brand-500/5' : 'border-white/5 bg-jet-900/30'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${state.wantsTPMS ? 'bg-brand-500 border-brand-500' : 'border-gray-600'}`}>
                        {state.wantsTPMS && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <div className="flex items-center gap-2">
                         <Cpu size={14} className="text-orange-400" />
                         <span className="text-[11px] font-bold">RDKS Sensoren einbauen & einlernen</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">+{EXTRAS_PRICE.tpms.toFixed(2)} €/Rad</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div 
                      onClick={() => handleToggle('wantsDisposal')}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${state.wantsDisposal ? 'border-brand-500 bg-brand-500/5' : 'border-white/5 bg-jet-900/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${state.wantsDisposal ? 'bg-brand-500 border-brand-500' : 'border-gray-600'}`}>
                          {state.wantsDisposal && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                        <span className="text-[11px] font-bold">Entsorgung</span>
                      </div>
                      <span className="text-[9px] text-gray-500">+{EXTRAS_PRICE.disposal.toFixed(2)} €/Rad</span>
                    </div>

                    <div 
                      onClick={() => handleToggle('wantsStorage')}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${state.wantsStorage ? 'border-brand-500 bg-brand-500/5' : 'border-white/5 bg-jet-900/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${state.wantsStorage ? 'bg-brand-500 border-brand-500' : 'border-gray-600'}`}>
                          {state.wantsStorage && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                        <span className="text-[11px] font-bold">Einlagerung</span>
                      </div>
                      <span className="text-[9px] text-gray-500">+{EXTRAS_PRICE.storage.toFixed(2)} €/Saison</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Total Section */}
              <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                   <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Geschätzter Gesamtpreis</span>
                   <div className="text-5xl font-black italic text-brand-500 tracking-tighter">
                      {new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(calculation.total)} €
                   </div>
                </div>

                <button 
                  onClick={() => onBookNow({ ...state, estimatedPrice: calculation.total, summary: calculation.summary })}
                  className="bg-brand-500 hover:bg-brand-600 text-white font-black italic uppercase tracking-wider py-4 px-10 rounded-xl shadow-2xl shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto text-center"
                >
                  TERMIN ANFRAGEN
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}} />
    </section>
  );
};

export default PriceCalculator;