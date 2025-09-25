// File: lib/domainData.ts
export const domainDataMap = {
  'delhitickets.com': {
    name: 'Delhi Tickets',
    title: 'Book Delhi Tours & Attractions Online',
    info: 'Official online booking for Delhi attractions.',
    domain_name: 'delhitickets.com',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    image_url: '/images/delhi.jpg',
    availability: true,
    meta_data: {
      title: 'Delhi Tickets – Book Online',
      description: 'Book tickets for Delhi attractions online.',
      keywords: 'Delhi tickets, Delhi tours',
      canonical_url: 'https://delhitickets.com',
      image_url: '/images/delhi.jpg'
    }
  },
  'agratickets.com': {
    name: 'Agra Tickets',
    title: 'Official Agra Tickets – Book Taj Mahal & Fort Entry Online',
    info: 'Secure your tickets for the Taj Mahal and other Agra monuments.',
    domain_name: 'agratickets.com',
    city: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    image_url: '/images/agra.jpg',
    availability: true,
    meta_data: {
      title: 'Agra Tickets – Book Online',
      description: 'Book entry tickets for the Taj Mahal and Agra Fort online.',
      keywords: 'Agra tickets, Taj Mahal tickets, Agra Fort tickets',
      canonical_url: 'https://agratickets.com',
      image_url: '/images/agra.jpg'
    }
  }
} as const;

export type DomainKey = keyof typeof domainDataMap; // 'delhitickets.com' | 'agratickets.com'
export type DomainData = typeof domainDataMap[DomainKey];
