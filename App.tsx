import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import TechSection from './components/TechSection.tsx';
import Calculator from './components/Calculator.tsx';
import Booking from './components/Booking.tsx';
import Contact from './components/Contact.tsx';
import FAQ from './components/FAQ.tsx';
import Footer from './components/Footer.tsx';
import LegalModal from './components/LegalModal.tsx';
import CookieBanner from './components/CookieBanner.tsx';
import { CalculatorState, SectionId } from './types.ts';
import { BUSINESS_INFO } from './constants.ts';
import { MessageCircle } from 'lucide-react';

function App() {
  const [bookingNote, setBookingNote] = useState<string>('');
  const [legalModalOpen, setLegalModalOpen] = useState<'impressum' | 'datenschutz' | null>(null);
  const [hasConsent, setHasConsent] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'true') {
      setHasConsent(true);
    }
  }, []);

  const handleConsentChange = (consent: boolean) => {
    setHasConsent(consent);
    localStorage.setItem('cookie-consent', consent.toString());
  };

  const handleCalculatorBooking = (data: Partial<CalculatorState> & { estimatedPrice: number; summary: string }) => {
    let note = `Kalkulation aus Rechner:\n`;
    note += `${data.summary}\n`;
    note += `----------------------\n`;
    note += `Geschätzter Gesamtpreis: ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.estimatedPrice)}`;

    setBookingNote(note);

    const bookingSection = document.getElementById(SectionId.TERMIN);
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const impressumContent = (
    <>
      <h3 className="font-bold text-lg mb-2">Angaben gemäß § 5 TMG:</h3>
      <p>Ajet Avdic<br />Mercedesstraße 3<br />76571 Gaggenau</p>
      <h3 className="font-bold text-lg mt-6 mb-2">Kontakt:</h3>
      <p>Telefon: 0177 7456428<br />E-Mail: {BUSINESS_INFO.email}</p>
      <h3 className="font-bold text-lg mt-6 mb-2">Umsatzsteuer-ID:</h3>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />DE320871586</p>
    </>
  );

  const datenschutzContent = (
    <div className="space-y-6 text-sm">
      <h2 className="text-2xl font-black italic uppercase text-jet-900 border-b-2 border-brand-500 pb-2">Datenschutzerklärung</h2>
      
      <section>
        <h3 className="font-bold text-xl mb-3">1. Datenschutz auf einen Blick</h3>
        <h4 className="font-bold mb-2 uppercase text-xs tracking-widest text-gray-400">Allgemeine Hinweise</h4>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
        
        <h4 className="font-bold mt-4 mb-2 uppercase text-xs tracking-widest text-gray-400">Datenerfassung auf dieser Website</h4>
        <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
        <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.</p>
        
        <p className="mt-2"><strong>Wie erfassen wir Ihre Daten?</strong></p>
        <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>
        
        <p className="mt-2"><strong>Wofür nutzen wir Ihre Daten?</strong></p>
        <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
        
        <p className="mt-2"><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
        <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.</p>
      </section>

      <section>
        <h3 className="font-bold text-xl mb-3">2. Hosting</h3>
        <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
        <h4 className="font-bold mt-2">Externes Hosting</h4>
        <p>Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter.</p>
        <p className="mt-2"><strong>Hoster:</strong><br />Vercel Inc.<br />440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
      </section>

      <section>
        <h3 className="font-bold text-xl mb-3">3. Allgemeine Hinweise und Pflichtinformationen</h3>
        <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
        
        <h4 className="font-bold mt-4 mb-2 uppercase text-xs tracking-widest text-gray-400">Hinweis zur verantwortlichen Stelle</h4>
        <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
        <p className="bg-gray-50 p-4 border-l-4 border-brand-500 rounded">
          <strong>Ajet Avdic</strong><br />
          Mercedesstraße 3<br />
          76571 Gaggenau<br />
          Telefon: 0177 7456428<br />
          E-Mail: {BUSINESS_INFO.email}
        </p>

        <h4 className="font-bold mt-4 mb-2 uppercase text-xs tracking-widest text-gray-400">SSL- bzw. TLS-Verschlüsselung</h4>
        <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
      </section>

      <section>
        <h3 className="font-bold text-xl mb-3">4. Datenerfassung auf dieser Website</h3>
        <h4 className="font-bold mb-2">Cookies</h4>
        <p>Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden.</p>
        
        <h4 className="font-bold mt-6 mb-2 text-brand-600">Kommunikation via WhatsApp</h4>
        <p>Wir bieten die Kontaktaufnahme via WhatsApp an. Anbieter ist die WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Wenn Sie uns per WhatsApp kontaktieren, werden Ihre Telefonnummer, Ihr Profilname sowie die Nachrichteninhalte verarbeitet. Die Nutzung erfolgt auf Grundlage unseres berechtigten Interesses an einer möglichst schnellen und effektiven Kommunikation mit Kunden und Interessenten (Art. 6 Abs. 1 lit. f DSGVO). Sofern die Kontaktaufnahme auf den Abschluss eines Vertrages abzielt, ist zusätzliche Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO. Details zur Datenverarbeitung finden Sie in der Datenschutzrichtlinie von WhatsApp: <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">https://www.whatsapp.com/legal/privacy-policy-eea</a>.</p>
        
        <h4 className="font-bold mt-6 mb-2">Kontaktformular</h4>
        <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
      </section>

      <section>
        <h3 className="font-bold text-xl mb-3">5. Plugins und Tools</h3>
        <h4 className="font-bold mb-2">Google Fonts (lokales Hosting)</h4>
        <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet dabei nicht statt.</p>
        
        <h4 className="font-bold mt-6 mb-2 text-brand-600">Google Maps</h4>
        <p>Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.</p>
        
        <h4 className="font-bold mt-6 mb-2 text-brand-600">Online-Terminbuchung (Cal.com) und Google Calendar</h4>
        <p>Wir binden auf unserer Website das Buchungs-Widget des Dienstes Cal.com (Anbieter: Cal.com, Inc., USA) ein. Wenn Sie einen Termin buchen, werden Ihre eingegebenen Daten (z. B. Name, E-Mail, gewünschte Leistung) verarbeitet, um den Termin zu planen. Diese Daten werden zur Terminverwaltung mit unserem Google Calendar (Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) synchronisiert. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen). Da Daten in die USA übertragen werden können, nutzen wir die Standardvertragsklauseln der EU-Kommission als Grundlage für die Datenverarbeitung. Details finden Sie bei Cal.com (<a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">https://cal.com/privacy</a>) und Google (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">https://policies.google.com/privacy</a>).</p>
      </section>

      <div className="pt-6 border-t border-gray-100 text-[10px] text-gray-400 italic">
        Quelle: eRecht24
      </div>
    </div>
  );

  return (
    <div className="font-sans text-jet-900 bg-gray-50 relative">
      <Header />
      <main>
        <Hero />
        <Services />
        <TechSection />
        <Calculator onBookNow={handleCalculatorBooking} />
        <Booking initialService={bookingNote} hasConsent={hasConsent} onAcceptCookies={() => handleConsentChange(true)} />
        <Contact />
        <FAQ />
      </main>
      <Footer 
        onOpenImpressum={() => setLegalModalOpen('impressum')}
        onOpenDatenschutz={() => setLegalModalOpen('datenschutz')}
      />
      <a 
        href={BUSINESS_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce-slow flex items-center justify-center group"
      >
        <MessageCircle size={32} fill="white" className="group-hover:rotate-12 transition-transform" />
      </a>
      <CookieBanner onConsentChange={handleConsentChange} onOpenDatenschutz={() => setLegalModalOpen('datenschutz')} />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
      `}} />
      <LegalModal isOpen={legalModalOpen === 'impressum'} onClose={() => setLegalModalOpen(null)} title="Impressum" content={impressumContent} />
      <LegalModal isOpen={legalModalOpen === 'datenschutz'} onClose={() => setLegalModalOpen(null)} title="Datenschutz" content={datenschutzContent} />
    </div>
  );
}

export default App;