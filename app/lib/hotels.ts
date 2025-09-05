export interface Hotel {
  slug: string;
  name: string;
  description: string;
}

export const hotels: Hotel[] = [
  {
    slug: 'royal-hotel',
    name: 'Royal Hotel',
    description: 'This is a luxurious hotel in the heart of the city.'
  },
  {
    slug: 'sunshine-resort',
    name: 'Sunshine Resort',
    description: 'A peaceful resort with beautiful views of the mountains.'
  }
];

export const getAllHotels = async () => hotels;

export const getHotelBySlug = async (slug: string) =>
  hotels.find((h) => h.slug === slug);
