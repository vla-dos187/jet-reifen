import { PricingTier } from './types';

export const BUSINESS_INFO = {
  name: "Jet Reifen-Service",
  address: "Mercedesstraße 3",
  zipCity: "76571 Gaggenau",
  phone: "+49 177 7456428",
  whatsappUrl: "https://wa.me/491777456428",
  email: "ajet-91@web.de",
  reviews: 69,
  rating: 5.0,
  googleMapsUrl: "https://maps.google.com/?q=Mercedesstraße+3,+76571+Gaggenau"
};

export const PRICING_DATA = {
  montage: {
    'pkw-suv': [
      { id: 'pkw-12-17', label: '12" - 17"', price: 10.00 },
      { id: 'pkw-18-19', label: '18" - 19"', price: 12.50 },
      { id: 'pkw-20-21', label: '20" - 21"', price: 15.00 },
      { id: 'pkw-22-23', label: '22" - 23"', price: 20.00 },
    ],
    'transporter': [
      { id: 'trans-12-18', label: '12" - 18"', price: 12.50 },
    ],
    'moto': [
      { id: 'moto-12-17', label: '12" - 17"', price: 12.50 },
      { id: 'moto-18-21', label: '18" - 21"', price: 15.00 },
    ]
  },
  radwechsel: {
    pkw: 25.00,
    suv: 30.00
  }
};

export const EXTRAS_PRICE = {
  disposal: 5.00, // Per wheel
  storage: 35.00, // Per set (season)
  klimaservice: 80.00, // Flat rate base
};

export const OPENING_HOURS = [
  { day: 'Mo – Fr', hours: '09:00 – 16:30' },
  { day: 'Sa', hours: '09:00 – 14:00' },
  { day: 'So', hours: 'Geschlossen' },
];