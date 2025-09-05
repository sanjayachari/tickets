// // app/hotels/[slug]/page.tsx
// import { getHotelBySlug } from "@/app/lib/hotels";
// import { translateText, SupportedLang } from "@/app/lib/utils/translate";

// interface Props {
//   params: { slug: string };
//   searchParams: { lang?: SupportedLang };
// }

// export default async function HotelDetail({ params, searchParams }: Props) {
//   try {

//       const temp = await translateText('hello', 'ru');
//       console.log('temp', temp);

//     const lang: SupportedLang = searchParams.lang || 'en';
//     const hotel = await getHotelBySlug(params.slug);

//     if (!hotel) return <p>Hotel not found</p>;

//     // Translate hotel name and description
//     const [name, description] = await Promise.all([
//       translateText(hotel.name, lang),
//       translateText(hotel.description, lang),
//     ]);

//     console.log('description|||',name, description);

//     return (
//       <div className="p-8 max-w-3xl mx-auto">
//         <h1 className="text-3xl font-bold mb-4">{name}</h1>
//         <p className="mb-6">{description}</p>
//         <button className="px-4 py-2 bg-blue-500 text-white rounded">
//           {lang === 'ru' ? 'Забронировать' : lang === 'hi' ? 'बुक करें' : 'Book Now'}
//         </button>
//       </div>
//     );
//   } catch (err) {
//     console.error('Page render error:', err);
//     return <p>Error loading hotel details</p>;
//   }
// }


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page