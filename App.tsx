import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import TechSection from './components/TechSection';
import Calculator from './components/Calculator';
import Booking from './components/Booking';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import CookieBanner from './components/CookieBanner';
import { CalculatorState, SectionId } from './types';
import { BUSINESS_INFO } from './constants';
import { MessageCircle } from 'lucide-react';

function App() {
  const [bookingNote, setBookingNote] = useState<string>('');
  const [legalModalOpen, setLegalModalOpen] = useState<'impressum' | 'datenschutz' | null>(null);

  const handleCalculatorBooking = (data: Partial<CalculatorState> & { estimatedPrice: number; summary: string }) => {
    let note = `Kalkulation aus Rechner:\n`;
    note += `${data.summary}\n`;
    note += `----------------------\n`;
    note += `Geschätzter Gesamtpreis: ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.estimatedPrice)}`;

    setBookingNote(note);

    // Scroll to booking section
    const bookingSection = document.getElementById(SectionId.TERMIN);
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Content Definitions
  const impressumContent = (
    <>
      <h3 className="font-bold text-lg mb-2">Angaben gemäß § 5 TMG:</h3>
      <p>
        Ajet Avdic<br />
        Mercedesstraße 3<br />
        76571 Gaggenau
      </p>

      <h3 className="font-bold text-lg mt-6 mb-2">Kontakt:</h3>
      <p>
        Telefon: 0177 7456428<br />
        E-Mail: ajet-91@web.de
      </p>

      <h3 className="font-bold text-lg mt-6 mb-2">Umsatzsteuer-ID:</h3>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
        DE320871586
      </p>

      <h3 className="font-bold text-lg mt-6 mb-2">EU-Streitschlichtung:</h3>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">https://ec.europa.eu/consumers/odr/</a>.<br />
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h3 className="font-bold text-lg mt-6 mb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle:</h3>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </>
  );

  const datenschutzContent = (
    <>
      <h3 className="font-bold text-lg mb-2">1. Datenschutz auf einen Blick</h3>
      <p>
        <strong>Allgemeine Hinweise</strong><br />
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
      </p>

      <h3 className="font-bold text-lg mt-6 mb-2">2. Datenerfassung auf unserer Website</h3>
      <p>
        <strong>Kontaktformular</strong><br />
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
      </p>
      <p className="mt-2">
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
      </p>

      <h3 className="font-bold text-lg mt-6 mb-2">3. Hosting</h3>
      <p>
        Wir hosten die Inhalte unserer Website bei einem externen Anbieter. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
      </p>
    </>
  );

  return (
    <div className="font-sans text-jet-900 bg-gray-50 relative">
      <Header />
      <main>
        <Hero />
        <Services />
        <TechSection />
        <Calculator onBookNow={handleCalculatorBooking} />
        <Booking initialService={bookingNote} />
        <Contact />
        <FAQ />
      </main>
      <Footer 
        onOpenImpressum={() => setLegalModalOpen('impressum')}
        onOpenDatenschutz={() => setLegalModalOpen('datenschutz')}
      />

      {/* Floating WhatsApp Button */}
      <a 
        href={BUSINESS_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce-slow flex items-center justify-center group"
        aria-label="WhatsApp schreiben"
      >
        <MessageCircle size={32} fill="white" className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-3 bg-white text-jet-900 px-3 py-1 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          WhatsApp schreiben
        </span>
      </a>

      <CookieBanner />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}} />

      <LegalModal 
        isOpen={legalModalOpen === 'impressum'}
        onClose={() => setLegalModalOpen(null)}
        title="Impressum"
        content={impressumContent}
      />

      <LegalModal 
        isOpen={legalModalOpen === 'datenschutz'}
        onClose={() => setLegalModalOpen(null)}
        title="Datenschutz"
        content={datenschutzContent}
      />
    </div>
  );
}

export default App;