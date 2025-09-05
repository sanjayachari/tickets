import Link from 'next/link';
import { getAllHotels } from '../lib/hotels';

interface Props {
  searchParams: { lang?: string };
}

export default async function HotelsPage({ searchParams }: Props) {
  const lang = searchParams.lang || 'en';
  const hotels = await getAllHotels();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {lang === 'ru' ? 'Отели' : lang === 'hi' ? 'होटल' : 'Hotels'}
      </h1>
      <ul className="space-y-4">
        {hotels.map((hotel) => (
          <li key={hotel.slug} className="p-4 border rounded bg-white">
            <Link href={`/hotels/${hotel.slug}?lang=${lang}`}>
              <h2 className="text-xl font-semibold">{hotel.name}</h2>
            </Link>
            <p>{hotel.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
