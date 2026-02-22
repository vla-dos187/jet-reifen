import React, { useState, useEffect } from 'react';
import { SectionId, BookingData } from '../types.ts';
import { Calendar, Check, Mail, Info, Loader2, ShieldAlert } from 'lucide-react';

interface BookingProps {
  initialService?: string;
  hasConsent?: boolean;
  onAcceptCookies?: () => void;
}

type BookingMode = 'calendar' | 'form';

const Booking: React.FC<BookingProps> = ({ initialService, hasConsent, onAcceptCookies }) => {
  const [mode, setMode] = useState<BookingMode>('calendar');
  const [formData, setFormData] = useState<BookingData>({
    Leistung: 'montage',
    Wunschtermin: '',
    Uhrzeit: '',
    Kunde: '',
    Telefonnummer: '',
    Nachricht: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load calculator data into Nachricht if provided
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, Nachricht: initialService }));
    }
  }, [initialService]);

  const validateDate = (dateStr: string) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const day = d.getDay();
    if (day === 0) return "Sonntags haben wir geschlossen.";
    return null;
  };

  const validateTime = (timeStr: string, dateStr: string) => {
    if (!timeStr || !dateStr) return null;
    const [hours, minutes] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;

    const d = new Date(dateStr);
    const day = d.getDay();

    if (totalMinutes < 540) return "Wir öffnen erst um 09:00 Uhr.";

    if (day === 6) { // Saturday
      if (totalMinutes > 840) return "Samstags schließen wir um 14:00 Uhr.";
    } else { // Weekday
      if (totalMinutes > 990) return "Mo-Fr schließen wir um 16:30 Uhr.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.Leistung || !formData.Kunde || !formData.Telefonnummer || !formData.Wunschtermin || !formData.Uhrzeit) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    const dateErr = validateDate(formData.Wunschtermin);
    if (dateErr) {
      setError(dateErr);
      return;
    }

    const timeErr = validateTime(formData.Uhrzeit, formData.Wunschtermin);
    if (timeErr) {
      setError(timeErr);
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
          access_key: "5c50e258-21fc-40ec-b592-44032504f35a",
          subject: `NEUE ANFRAGE: ${formData.Kunde}`,
          from_name: "Jet Reifen Website",
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData(prev => ({
           ...prev,
           Kunde: '',
           Telefonnummer: '',
           Nachricht: ''
        }));
      } else {
        setError("Es gab ein Problem beim Senden. Bitte versuchen Sie es später.");
      }
    } catch (err) {
      setError("Verbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'Wunschtermin' || name === 'Uhrzeit') setError(null);
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

        {initialService && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3 animate-fade-in-up">
            <div className="text-brand-500 shrink-0 mt-1">
              <span className="p-1 bg-white rounded shadow-sm">
                <Info size={18} />
              </span>
            </div>
            <div>
              <h4 className="font-bold text-blue-900 text-sm">Kalkulation übernommen</h4>
              <p className="text-xs text-blue-800 whitespace-pre-line opacity-80 mt-1">{initialService}</p>
            </div>
          </div>
        )}

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
              Anfrage
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 min-h-[700px]">
          
          {mode === 'calendar' && (
            <div className="w-full h-[700px] flex flex-col bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 animate-fade-in-up">
              {hasConsent ? (
                <iframe 
                  src="https://cal.eu/jet-reifen-service?embed=true&theme=dark" 
                  style={{ width: '100%', height: '700px', border: 'none' }}
                  scrolling="auto"
                  title="Jet Reifen Terminbuchung"
                ></iframe>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-white">
                  <div className="bg-brand-500/20 p-6 rounded-full mb-6">
                    <ShieldAlert size={64} className="text-brand-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 italic uppercase">Datenschutz-Hinweis</h3>
                  <p className="text-gray-400 max-w-md mb-8">
                    Um unseren Online-Kalender nutzen zu können, müssen Sie externe Dienste und Cookies akzeptieren.
                  </p>
                  <button 
                    onClick={onAcceptCookies}
                    className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-brand-500/20"
                  >
                    Cookies & Kalender akzeptieren
                  </button>
                  <p className="text-xs text-gray-600 mt-6">
                    Alternativ können Sie uns über den Tab "Anfrage" eine Nachricht senden.
                  </p>
                </div>
              )}
            </div>
          )}

          {mode === 'form' && (
            <div className="p-6 md:p-10 animate-fade-in-up">
              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-jet-900 mb-2">Anfrage gesendet!</h3>
                  <p className="text-gray-600 mb-6">Wir melden uns telefonisch zur Bestätigung.</p>
                  <button onClick={() => setSuccess(false)} className="text-brand-500 font-bold hover:underline">Neue Anfrage</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                  <input type="hidden" name="from_name" value="Jet Reifen Website" />
                  <input type="hidden" name="subject" value={`NEUE ANFRAGE: ${formData.Kunde || '[Kunde]'}`} />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Leistung *</label>
                      <select 
                        name="Leistung" 
                        value={formData.Leistung} 
                        onChange={handleChange} 
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer"
                      >
                        <option value="montage">Reifenmontage</option>
                        <option value="verkauf">Reifenverkauf</option>
                        <option value="reparatur">Reifenreparatur</option>
                        <option value="wechsel">Radwechsel (Saison)</option>
                        <option value="klimaservice">Klimaservice</option>
                        <option value="beratung">Beratung</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Wunschtermin *</label>
                      <input 
                        type="date" 
                        name="Wunschtermin" 
                        min={new Date().toISOString().split('T')[0]} 
                        value={formData.Wunschtermin} 
                        onChange={handleChange} 
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Uhrzeit *</label>
                      <input 
                        type="time" 
                        name="Uhrzeit" 
                        value={formData.Uhrzeit} 
                        onChange={handleChange} 
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Kunde *</label>
                      <input 
                        type="text" 
                        name="Kunde" 
                        placeholder="Ihr Name"
                        value={formData.Kunde} 
                        onChange={handleChange} 
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Telefonnummer *</label>
                      <input 
                        type="tel" 
                        name="Telefonnummer" 
                        placeholder="Für Rückfragen"
                        value={formData.Telefonnummer} 
                        onChange={handleChange} 
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none" 
                        required 
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nachricht</label>
                      <textarea 
                        name="Nachricht" 
                        value={formData.Nachricht} 
                        onChange={handleChange} 
                        placeholder="Details oder Reifengröße..."
                        rows={3} 
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none"
                      ></textarea>
                    </div>
                  </div>
                  {error && <div className="text-red-600 bg-red-50 p-3 rounded border border-red-200 text-sm">{error}</div>}
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95"
                  >
                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Mail size={20} />}
                    Anfrage senden
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-2">* Pflichtfelder</p>
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
