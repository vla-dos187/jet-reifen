// Added React import to resolve TypeScript namespace error
import React from 'react';

export const metadata = {
  title: 'Jet Reifen-Service Gaggenau | Reifenwechsel & Klimaservice',
  description: 'Professioneller Reifenservice in Gaggenau. Reifenwechsel, Montage, Auswuchten und Klimaservice. Jetzt Termin online buchen!',
  keywords: 'Reifenwechsel Gaggenau, Reifenservice, Klimaservice, Jet Reifen, Ajet Avdic, Reifenmontage, Gaggenau Werkstatt',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Jet Reifen-Service Gaggenau',
    description: 'Ihr Profi für Reifen und Klima in Gaggenau. Schnell, zuverlässig, preiswert.',
    url: 'https://jetreifen-service.de', 
    siteName: 'Jet Reifen-Service',
    images: [
      {
        url: '/images/hero-mercedes.webp', 
        width: 1200,
        height: 630,
        alt: 'Jet Reifen-Service Mercedes 500 E',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}