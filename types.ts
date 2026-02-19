export interface PricingTier {
  id: string;
  label: string;
  pricePerWheel: number;
}

export type ServiceMode = 'montage' | 'radwechsel';
export type RimType = 'stahl' | 'alu';
export type VehicleCategory = 'pkw' | 'suv' | 'transporter' | 'moto';

export interface CalculatorState {
  serviceMode: ServiceMode;
  vehicleCategory: VehicleCategory;
  rimType: RimType;
  rimSizeId: string;
  quantity: number;
  onVehicle: boolean;
  wantsDisposal: boolean;
  wantsStorage: boolean;
  wantsKlimaservice: boolean;
  wantsTPMS: boolean;
}

export interface BookingData {
  Leistung: string;
  Wunschtermin: string;
  Uhrzeit: string;
  Kunde: string;
  Telefonnummer: string;
  Nachricht: string;
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