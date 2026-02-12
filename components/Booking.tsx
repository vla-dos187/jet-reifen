import React, { useState, useEffect } from 'react';
import { SectionId, BookingData } from '../types';
import { Calendar, Check, Mail, Info, Loader2 } from 'lucide-react';

interface BookingProps {
  initialService?: string;
}

type BookingMode = 'calendar' | 'form';

const Booking: React.FC<BookingProps> = ({ initialService }) => {
  const [mode, setMode] = useState<BookingMode>('calendar');
  const [formData, setFormData] = useState<BookingData>({
    serviceType: 'montage',
    date: '',
    time: '',
    name: '',
    phone: '',
    notes: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load Calendly Script
  useEffect(() => {
    if (mode === 'calendar') {
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        const scripts = document.querySelectorAll('script[src="https://assets.calendly.com/assets/external/widget.js"]');
        scripts.forEach(s => s.remove());
      };
    }
  }, [mode]);

  // Load calculator data into notes
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, notes: initialService }));
    }
  }, [initialService]);

  const validateDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDay();
    if (day === 0) return "Sonntags haben wir geschlossen.";
    return null;
  };

  const validateTime = (timeStr: string, dateStr: string) => {
    if (!timeStr) return "Bitte Uhrzeit wählen";
    const [hours, minutes] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;

    const d = new Date(dateStr);
    const day = d.getDay(); // 6 is Saturday

    // Base open: 09:00 (540 mins)
    if (totalMinutes < 540) return "Wir öffnen erst um 09:00 Uhr.";

    if (day === 6) { // Saturday
      // Close 14:00 (840)
      if (totalMinutes > 840) return "Samstags schließen wir um 14:00 Uhr.";
    } else { // Weekday
      // Close 16:30 (990)
      if (totalMinutes > 990) return "Mo-Fr schließen wir um 16:30 Uhr.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.date || !formData.time || !formData.name || !formData.phone) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    const dateError = validateDate(formData.date);
    if (dateError) {
      setError(dateError);
      return;
    }

    const timeError = validateTime(formData.time, formData.date);
    if (timeError) {
      setError(timeError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "a4f78814-8263-4558-b013-af8c680fb4c1",
          subject: `Neue Terminanfrage: ${formData.serviceType} am ${formData.date}`,
          from_name: "Jet Reifen Website",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        // Optional: Reset form data here if needed
        setFormData(prev => ({
           ...prev,
           name: '',
           phone: '',
           notes: ''
        }));
      } else {
        console.error("Web3Forms Error:", result);
        setError("Es gab ein Problem beim Senden. Bitte versuchen Sie es später oder rufen Sie uns an.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setError("Verbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user changes date/time
    if (name === 'date' || name === 'time') setError(null);
  };

  return (
    <section id={SectionId.TERMIN} className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-12">
          <span className="bg-brand-500/10 text-brand-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
            Online Buchung
          </span>
          <h2 className="text-3xl md:text-4xl font-black italic text-jet-900 mt-4 mb-4">
            Termin vereinbaren
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wählen Sie Ihren Wunschtermin direkt im Kalender oder senden Sie uns eine individuelle Anfrage.
          </p>
        </div>

        {/* Info Box from Calculator */}
        {initialService && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3 animate-fade-in-up">
            <div className="text-brand-500 shrink-0 mt-1">
              <Info size={20} />
            </div>
            <div>
              <h4 className="font-bold text-blue-900">Kalkulation übernommen</h4>
              <p className="text-sm text-blue-800 whitespace-pre-line">{initialService}</p>
              {mode === 'calendar' && (
                <p className="text-xs text-blue-600 mt-2 italic">
                  *Bitte geben Sie diese Details bei der Buchung im Kalender (Feld "Notizen") an.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
            <button
              onClick={() => setMode('calendar')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                mode === 'calendar' 
                  ? 'bg-brand-500 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Calendar size={18} />
              Direktbuchung
            </button>
            <button
              onClick={() => setMode('form')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                mode === 'form' 
                  ? 'bg-brand-500 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Mail size={18} />
              Anfrage-Formular
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 min-h-[700px]">
          
          {/* --- CALENDLY MODE --- */}
          {mode === 'calendar' && (
            <div className="w-full min-h-[700px] bg-white relative animate-fade-in-up">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/real-danny-dr/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=f97316" 
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
            </div>
          )}

          {/* --- MANUAL FORM MODE --- */}
          {mode === 'form' && (
            <div className="p-6 md:p-10 animate-fade-in-up">
              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-jet-900 mb-2">Anfrage gesendet!</h3>
                  <p className="text-gray-600 mb-6">
                    Vielen Dank. Wir haben Ihre Anfrage erhalten und melden uns telefonisch zur Bestätigung.
                  </p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="text-brand-500 font-bold hover:underline"
                  >
                    Weitere Anfrage senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                  <div className="text-center mb-8 md:hidden">
                      <p className="text-sm text-gray-500">Bitte füllen Sie das Formular für Ihren Wunschtermin aus.</p>
                  </div>

                  {/* Grid Layout */}
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Service Selection */}
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Service</label>
                      <select 
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      >
                        <option value="montage">Reifenmontage</option>
                        <option value="verkauf">Reifenverkauf</option>
                        <option value="reparatur">Reifenreparatur</option>
                        <option value="wechsel">Radwechsel (Saison)</option>
                        <option value="einlagerung">Einlagerung</option>
                        <option value="klimaservice">Klimaservice</option>
                        <option value="beratung">Beratung / Sonstiges</option>
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Wunschdatum</label>
                      <input 
                        type="date" 
                        name="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Mo-Sa geöffnet</p>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Uhrzeit</label>
                      <input 
                        type="time" 
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">09:00 - 16:30 (Sa bis 14:00)</p>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Max Mustermann"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Telefonnummer</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0171 12345678"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
                        required
                      />
                    </div>

                    {/* Notes (Prefilled from Calc) */}
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Details / Reifengröße</label>
                      <textarea 
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none"
                        placeholder="z.B. 205/55 R16, Alufelgen..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 text-sm font-medium">
                      {error}
                    </div>
                  )}

                  {/* Hidden Web3Forms Access Key Field */}
                  <input type="hidden" name="access_key" value="a4f78814-8263-4558-b013-af8c680fb4c1" />

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-lg shadow-lg shadow-brand-500/30 transition-all flex justify-center items-center gap-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sende...
                      </>
                    ) : (
                      <>
                        <Mail size={20} />
                        Terminanfrage senden
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;