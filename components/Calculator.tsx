import React, { useState, useEffect, useMemo } from 'react';
import { SectionId, CalculatorState, ServiceMode } from '../types';
import { PRICING_DATA, EXTRAS_PRICE } from '../constants';
import { Calculator, CheckCircle2, ThermometerSnowflake, Car, Bike, Truck, Info } from 'lucide-react';

interface CalculatorProps {
  onBookNow: (data: Partial<CalculatorState> & { estimatedPrice: number; summary: string }) => void;
}

const PriceCalculator: React.FC<CalculatorProps> = ({ onBookNow }) => {
  const [state, setState] = useState<CalculatorState>({
    serviceMode: 'montage',
    vehicleCategory: 'pkw-suv',
    rimSizeId: 'pkw-12-17',
    quantity: 4,
    onVehicle: true,
    wantsDisposal: false,
    wantsStorage: false,
    wantsKlimaservice: false,
  });

  // Derived Values
  const availableSizes = useMemo(() => {
    if (state.serviceMode === 'radwechsel') return [];
    const cat = state.vehicleCategory as 'pkw-suv' | 'transporter' | 'moto';
    return PRICING_DATA.montage[cat] || [];
  }, [state.serviceMode, state.vehicleCategory]);

  // Sync rimSizeId when category or mode changes
  useEffect(() => {
    if (state.serviceMode === 'montage' && availableSizes.length > 0) {
      if (!availableSizes.find(s => s.id === state.rimSizeId)) {
        setState(prev => ({ ...prev, rimSizeId: availableSizes[0].id }));
      }
    }
  }, [state.vehicleCategory, state.serviceMode, availableSizes]);

  const calculateTotal = () => {
    let total = 0;
    let summaryParts: string[] = [];

    if (state.serviceMode === 'montage') {
      const selectedSize = availableSizes.find(s => s.id === state.rimSizeId);
      const basePricePerWheel = selectedSize?.price || 0;
      
      total += basePricePerWheel * state.quantity;
      summaryParts.push(`Montage: ${state.quantity}x ${selectedSize?.label} (${basePricePerWheel.toFixed(2)}€/Rad)`);

      if (state.onVehicle) {
        let mountingSurcharge = 0;
        if (state.quantity === 4) mountingSurcharge = 20;
        else if (state.quantity === 2) mountingSurcharge = 10;
        else if (state.quantity === 1) mountingSurcharge = 5;
        
        total += mountingSurcharge;
        summaryParts.push(`Fahrzeugmontage: +${mountingSurcharge.toFixed(2)}€ Pauschale`);
      }
    } else {
      // Radwechsel Flatrate (always assumed for a set, or as requested)
      const isSuv = state.vehicleCategory === 'suv-specific';
      const flatPrice = isSuv ? PRICING_DATA.radwechsel.suv : PRICING_DATA.radwechsel.pkw;
      total += flatPrice;
      summaryParts.push(`Radwechsel (Satz): ${isSuv ? 'SUV' : 'PKW'} (${flatPrice.toFixed(2)}€)`);
    }

    // Extras
    if (state.wantsDisposal) {
      const disposalPrice = EXTRAS_PRICE.disposal * state.quantity;
      total += disposalPrice;
      summaryParts.push(`Altreifenentsorgung: +${disposalPrice.toFixed(2)}€`);
    }
    if (state.wantsStorage) {
      total += EXTRAS_PRICE.storage;
      summaryParts.push(`Einlagerung: +${EXTRAS_PRICE.storage.toFixed(2)}€`);
    }
    if (state.wantsKlimaservice) {
      total += EXTRAS_PRICE.klimaservice;
      summaryParts.push(`Klimaservice: +${EXTRAS_PRICE.klimaservice.toFixed(2)}€`);
    }

    return { total, summary: summaryParts.join('\n') };
  };

  const { total: totalPrice, summary: priceSummary } = calculateTotal();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(val);
  };

  const handleBookClick = () => {
    onBookNow({
      ...state,
      estimatedPrice: totalPrice,
      summary: priceSummary
    });
  };

  return (
    <section id={SectionId.RECHNER} className="py-24 bg-jet-900 text-white relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 text-brand-500 font-bold mb-4">
              <Calculator size={24} />
              <span>Transparente Preise 2024</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-6 leading-tight">
              Was kostet<br />Ihr Service?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Kalkulieren Sie Ihren Service in Echtzeit. Wir setzen auf faire Preise und modernste Technik.
            </p>
            <div className="space-y-6">
               <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="bg-brand-500/20 p-2 rounded-lg text-brand-500">
                    <ThermometerSnowflake size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Profi-Klimaservice</h4>
                    <p className="text-sm text-gray-400">
                      Befüllung & Wartung für <b>R134a</b> und <b>R1234yf</b> Anlagen. Inklusive präziser Lecksuche mit Stickstoff für maximale Sicherheit.
                    </p>
                  </div>
               </div>
               <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="bg-brand-500/20 p-2 rounded-lg text-brand-500">
                    <Info size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Montage-Pauschale</h4>
                    <p className="text-sm text-gray-400">Für die De-/Montage am Fahrzeug berechnen wir eine Pauschale (5€ bei 1 Rad, 10€ bei 2 Rädern, 20€ bei 4 Rädern).</p>
                  </div>
               </div>
               <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-500" size={18}/> Inklusive neuer Gummiventile</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-500" size={18}/> Inklusive Feinwuchten</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-brand-500" size={18}/> Klimaservice ab 80,00 €</li>
              </ul>
            </div>
          </div>

          {/* Calculator Card */}
          <div className="bg-jet-800 rounded-2xl p-6 md:p-8 border border-gray-700 shadow-2xl">
            
            {/* 1. Service Mode Toggle */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Service-Art</label>
              <div className="grid grid-cols-2 gap-2 bg-jet-900 p-1 rounded-xl border border-gray-700">
                <button
                  onClick={() => setState(s => ({ ...s, serviceMode: 'montage' }))}
                  className={`py-3 px-4 rounded-lg font-bold text-sm transition-all ${state.serviceMode === 'montage' ? 'bg-brand-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                  Reifenmontage
                </button>
                <button
                  onClick={() => setState(s => ({ ...s, serviceMode: 'radwechsel' }))}
                  className={`py-3 px-4 rounded-lg font-bold text-sm transition-all ${state.serviceMode === 'radwechsel' ? 'bg-brand-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                  Radwechsel
                </button>
              </div>
            </div>

            {/* 2. Vehicle Category */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Fahrzeugtyp</label>
              <div className="grid grid-cols-3 gap-2">
                {state.serviceMode === 'montage' ? (
                  <>
                    <button
                      onClick={() => setState(s => ({ ...s, vehicleCategory: 'pkw-suv' }))}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${state.vehicleCategory === 'pkw-suv' ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                    >
                      <Car size={20} />
                      <span className="text-[10px] font-bold uppercase">PKW/SUV</span>
                    </button>
                    <button
                      onClick={() => setState(s => ({ ...s, vehicleCategory: 'transporter' }))}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${state.vehicleCategory === 'transporter' ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                    >
                      <Truck size={20} />
                      <span className="text-[10px] font-bold uppercase">Transporter</span>
                    </button>
                    <button
                      onClick={() => setState(s => ({ ...s, vehicleCategory: 'moto' }))}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${state.vehicleCategory === 'moto' ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                    >
                      <Bike size={20} />
                      <span className="text-[10px] font-bold uppercase">Motorrad</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setState(s => ({ ...s, vehicleCategory: 'pkw-suv' }))}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all col-span-1.5 ${state.vehicleCategory === 'pkw-suv' ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                    >
                      <Car size={20} />
                      <span className="text-[10px] font-bold uppercase">PKW (25€)</span>
                    </button>
                    <button
                      onClick={() => setState(s => ({ ...s, vehicleCategory: 'suv-specific' }))}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all col-span-1.5 ${state.vehicleCategory === 'suv-specific' ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                    >
                      <Truck size={20} />
                      <span className="text-[10px] font-bold uppercase">SUV (30€)</span>
                    </button>
                    <div className="flex items-center justify-center text-xs text-gray-500 italic px-2">Satzpreis</div>
                  </>
                )}
              </div>
            </div>

            {/* 3. Rim Sizes & Quantity (Only for Montage) */}
            {state.serviceMode === 'montage' && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Felgengröße</label>
                  <select 
                    value={state.rimSizeId}
                    onChange={(e) => setState(s => ({ ...s, rimSizeId: e.target.value }))}
                    className="w-full bg-jet-900 border border-gray-600 rounded-lg p-3 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none cursor-pointer"
                  >
                    {availableSizes.map(size => (
                      <option key={size.id} value={size.id}>{size.label} ({formatCurrency(size.price)}/Rad)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Anzahl</label>
                  <div className="flex bg-jet-900 border border-gray-600 rounded-lg overflow-hidden">
                    {[1, 2, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setState(s => ({ ...s, quantity: num }))}
                        className={`flex-1 py-3 font-bold transition-colors ${state.quantity === num ? 'bg-brand-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Mounting Option (Only for Montage) */}
            {state.serviceMode === 'montage' && (
              <div className="mb-8">
                 <label className="flex items-center gap-4 p-4 bg-jet-900 rounded-xl border border-gray-700 cursor-pointer hover:border-gray-500 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={state.onVehicle}
                      onChange={(e) => setState(s => ({ ...s, onVehicle: e.target.checked }))}
                      className="w-6 h-6 rounded text-brand-500 focus:ring-brand-500 bg-gray-700 border-gray-600"
                    />
                    <div className="flex-1">
                      <span className="block font-bold text-white text-sm">Räder am Fahrzeug montiert</span>
                      <span className="block text-xs text-gray-500">Addiert Pauschale (5€/10€/20€) je nach Anzahl</span>
                    </div>
                 </label>
              </div>
            )}

            {/* 5. Extras */}
            <div className="space-y-3 mb-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Zusatzleistungen</label>
              
              <label className="flex items-center justify-between p-4 bg-jet-900 rounded-xl border border-gray-700 cursor-pointer hover:border-gray-500 transition-colors">
                <span className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={state.wantsKlimaservice}
                    onChange={(e) => setState(s => ({ ...s, wantsKlimaservice: e.target.checked }))}
                    className="w-5 h-5 rounded text-brand-500 focus:ring-brand-500"
                  />
                  <span className="flex items-center gap-2 text-sm">
                    <ThermometerSnowflake size={16} className="text-blue-400" />
                    Klimaservice (R134a/R1234yf)
                  </span>
                </span>
                <span className="font-bold text-xs text-gray-400">+{formatCurrency(EXTRAS_PRICE.klimaservice)}</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1 p-3 bg-jet-900 rounded-xl border border-gray-700 cursor-pointer hover:border-gray-500 transition-colors">
                  <span className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={state.wantsDisposal}
                      onChange={(e) => setState(s => ({ ...s, wantsDisposal: e.target.checked }))}
                      className="w-4 h-4 rounded text-brand-500"
                    />
                    <span className="text-xs font-bold">Entsorgung</span>
                  </span>
                  <span className="text-[10px] text-gray-500 ml-6">+{formatCurrency(EXTRAS_PRICE.disposal)}/Rad</span>
                </label>

                <label className="flex flex-col gap-1 p-3 bg-jet-900 rounded-xl border border-gray-700 cursor-pointer hover:border-gray-500 transition-colors">
                  <span className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={state.wantsStorage}
                      onChange={(e) => setState(s => ({ ...s, wantsStorage: e.target.checked }))}
                      className="w-4 h-4 rounded text-brand-500"
                    />
                    <span className="text-xs font-bold">Einlagerung</span>
                  </span>
                  <span className="text-[10px] text-gray-500 ml-6">+{formatCurrency(EXTRAS_PRICE.storage)}/Saison</span>
                </label>
              </div>
            </div>

            {/* Total Footer */}
            <div className="border-t border-gray-700 pt-6">
              <div className="flex justify-between items-end mb-6">
                <span className="text-gray-400 font-medium text-sm">Geschätzter Gesamtpreis</span>
                <span className="text-4xl font-black text-brand-500">{formatCurrency(totalPrice)}</span>
              </div>

              <button 
                onClick={handleBookClick}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand-500/20"
              >
                Termin anfragen
              </button>
              <p className="text-[10px] text-center text-gray-500 mt-4 leading-tight italic">
                *Preise inkl. MwSt. Finaler Preis kann je nach Kältemittelmenge und Materialaufwand variieren.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;