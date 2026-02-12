export interface PricingTier {
  id: string;
  label: string;
  pricePerWheel: number;
  category: 'pkw-suv' | 'transporter' | 'moto';
}

export type ServiceMode = 'montage' | 'radwechsel';

export interface CalculatorState {
  serviceMode: ServiceMode;
  vehicleCategory: 'pkw-suv' | 'transporter' | 'moto' | 'suv-specific';
  rimSizeId: string;
  quantity: number;
  onVehicle: boolean;
  wantsDisposal: boolean;
  wantsStorage: boolean;
  wantsKlimaservice: boolean;
}

export interface BookingData {
  serviceType: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
}

export enum SectionId {
  HOME = 'home',
  LEISTUNGEN = 'leistungen',
  TECH = 'technik',
  RECHNER = 'rechner',
  TERMIN = 'termin',
  KONTAKT = 'kontakt',
  FAQ = 'faq'
}