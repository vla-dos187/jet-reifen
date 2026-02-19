export const BUSINESS_INFO = {
  name: "Jet Reifen-Service",
  address: "Mercedesstraße 3",
  zipCity: "76571 Gaggenau",
  phone: "+49 177 7456428",
  whatsappUrl: "https://wa.me/491777456428",
  email: "jetreifen.gaggenau@gmail.com",
  reviews: 69,
  rating: 5.0,
  googleMapsUrl: "https://maps.google.com/?q=Mercedesstraße+3,+76571+Gaggenau"
};

export const PRICING_DATA = {
  montage: {
    pkw: {
      stahl: [
        { id: 'pkw-s-12-16', label: '12" - 16"', price: 10.00 },
        { id: 'pkw-s-17-19', label: '17" - 19"', price: 15.00 },
      ],
      alu: [
        { id: 'pkw-a-12-16', label: '12" - 16"', price: 10.00 },
        { id: 'pkw-a-17', label: '17"', price: 12.50 },
        { id: 'pkw-a-18-19', label: '18" - 19"', price: 15.00 },
        { id: 'pkw-a-20', label: '20"', price: 17.50 },
        { id: 'pkw-a-21-23', label: '21" - 23"', price: 20.00 },
      ]
    },
    suv: {
      stahl: [
        { id: 'suv-s-12-18', label: '12" - 18"', price: 10.00 },
      ],
      alu: [
        { id: 'suv-a-12-16', label: '12" - 16"', price: 10.00 },
        { id: 'suv-a-17', label: '17"', price: 12.50 },
        { id: 'suv-a-18-19', label: '18" - 19"', price: 15.00 },
        { id: 'suv-a-20', label: '20"', price: 17.50 },
        { id: 'suv-a-21-23', label: '21" - 23"', price: 20.00 },
      ]
    },
    transporter: {
      stahl: [
        { id: 'trans-s-12-18', label: '12" - 18"', price: 12.50 },
      ],
      alu: [
        { id: 'trans-a-12-16', label: '12" - 16"', price: 12.50 },
        { id: 'trans-a-17-19', label: '17" - 19"', price: 15.00 },
      ]
    },
    moto: {
      stahl: [
        { id: 'moto-s-12-17', label: '12" - 17"', price: 12.50 },
        { id: 'moto-s-18-21', label: '18" - 21"', price: 15.00 },
      ],
      alu: [
        { id: 'moto-a-12-17', label: '12" - 17"', price: 12.50 },
        { id: 'moto-a-18-21', label: '18" - 21"', price: 15.00 },
      ]
    }
  },
  radwechsel: {
    pkw: 25.00,
    suv: 30.00,
    transporter: 35.00
  }
};

export const EXTRAS_PRICE = {
  disposal: 5.00, // Per wheel
  storage: 35.00, // Per set (season)
  klimaservice: 80.00, // Flat rate base
  tpms: 5.00, // Per wheel (Reifendrucksensoren)
};

export const OPENING_HOURS = [
  { day: 'Mo – Fr', hours: '09:00 – 16:30' },
  { day: 'Sa', hours: '09:00 – 14:00' },
  { day: 'So', hours: 'Geschlossen' },
];