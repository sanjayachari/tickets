// import { format } from "date-fns";
// // import {
// //   encodeChildAgesAsUrlParams,
// //   formatTimestampToDateString,
// // } from "@/src/utils";
// import { PageRouterQueryParams } from "../classModels/queryParams/PageRouterQueryParams";

import { TourBookingDetails } from "@/app/classes/bookings/tourBookingDetails";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface PageRouterQueryParams {
  router: AppRouterInstance;
  searchedQuery: string;
}

// //////////// Search Router //////////////

// export const routerToHotelSearchPage = async (
//   params: PageRouterQueryParams,
// ) => {
//   if (params.push) {
//     const query: { [key: string]: string | string[] } = {
//       q: params.searchText,
//       checkin: String(format(params.checkin, "dd-MM-yyyy")),
//       checkout: String(format(params.checkout, "dd-MM-yyyy")),
//       num_nights: String(params.num_nights),
//       num_guests: String(params.num_guests),
//       num_adults: String(params.num_adults),
//       num_rooms: String(params.num_rooms),
//       num_children: String(params.num_children),
//       child_age: String(params.child_age),
//     };

//     // Add all child ages in the desired format
//     query.child_age = params.child_age.map(
//       (age: number, index: number) => `${index}_${age}`,
//     );

//     params.router.push({
//       pathname: `hotels/search/results`,
//       query,
//     });
//   } else {
//     const query: { [key: string]: string | string[] } = {
//       q: params.searchText,
//       checkin: String(format(params.checkin, "dd-MM-yyyy")),
//       checkout: String(format(params.checkout, "dd-MM-yyyy")),
//       num_nights: String(params.num_nights),
//       num_guests: String(params.num_guests),
//       num_adults: String(params.num_adults),
//       num_rooms: String(params.num_rooms),
//       num_children: String(params.num_children),
//       child_age: String(params.child_age),
//     };

//     // Add all child ages in the desired format
//     query.child_age = params.child_age.map(
//       (age: number, index: number) => `${index}_${age}`,
//     );

//     params.router.replace({
//       pathname: `/search/results`,
//       query,
//     });
//   }
// };

// export const routerToSearchPage = async (params: PageRouterQueryParams) => {
//   if (params.push) {
//     const query: { [key: string]: string | string[] } = {
//       q: params.searchText,
//       checkin: String(format(params.checkin, "dd-MM-yyyy")),
//       checkout: String(format(params.checkout, "dd-MM-yyyy")),
//       num_nights: String(params.num_nights),
//       num_guests: String(params.num_guests),
//       num_adults: String(params.num_adults),
//       num_rooms: String(params.num_rooms),
//       num_children: String(params.num_children),
//       child_age: String(params.child_age),
//     };

//     // Add all child ages in the desired format
//     query.child_age = params.child_age.map(
//       (age: number, index: number) => `${index}_${age}`,
//     );

//     params.router.push({
//       pathname: `/search/results`,
//       query,
//     });
//   } else {
//     const query: { [key: string]: string | string[] } = {
//       q: params.searchText,
//       checkin: String(format(params.checkin, "dd-MM-yyyy")),
//       checkout: String(format(params.checkout, "dd-MM-yyyy")),
//       num_nights: String(params.num_nights),
//       num_guests: String(params.num_guests),
//       num_adults: String(params.num_adults),
//       num_rooms: String(params.num_rooms),
//       num_children: String(params.num_children),
//       child_age: String(params.child_age),
//     };

//     // Add all child ages in the desired format
//     query.child_age = params.child_age.map(
//       (age: number, index: number) => `${index}_${age}`,
//     );

//     params.router.replace({
//       pathname: `/search/results`,
//       query,
//     });
//   }
// };

// export const routerToPaymentPage = async (params: PageRouterQueryParams) => {
//   if (params.push) {
//     const query: { [key: string]: string | string[] } = {
//       hName: params.hotelName,
//       hId: params.hotelSlugName,
//       checkin: String(format(params.checkin, "dd-MM-yyyy")),
//       checkout: String(format(params.checkout, "dd-MM-yyyy")),
//       num_nights: String(params.num_nights),
//       num_guests: String(params.num_guests),
//       num_adults: String(params.num_adults),
//       num_rooms: String(params.num_rooms),
//       num_children: String(params.num_children),
//     };

//     // Add all child ages in the desired format
//     query.child_age = params.child_age.map(
//       (age: number, index: number) => `${index}_${age}`,
//     );

//     params.router.push({
//       pathname: `/payment`,
//       query,
//     });
//   } else {
//     const query: { [key: string]: string | string[] } = {
//       hName: params.hotelName,
//       hId: params.hotelSlugName,
//       checkin: String(format(params.checkin, "dd-MM-yyyy")),
//       checkout: String(format(params.checkout, "dd-MM-yyyy")),
//       num_nights: String(params.num_nights),
//       num_guests: String(params.num_guests),
//       num_adults: String(params.num_adults),
//       num_rooms: String(params.num_rooms),
//       num_children: String(params.num_children),
//       child_age: String(params.child_age),
//     };

//     // Add all child ages in the desired format
//     query.child_age = params.child_age.map(
//       (age: number, index: number) => `${index}_${age}`,
//     );

//     params.router.replace({
//       pathname: `/payment/`,
//       query,
//     });
//   }
// };

// export const routerToHotelBookingPage = async (
//   params: PageRouterQueryParams,
// ) => {
//   // get the desired formatted child ages string with key and value
//   // ex [2, 4] => child_age=0_2&child_age=1_4
//   const childAgeQuery = encodeChildAgesAsUrlParams(params.child_age);

//   if (!params.isWebpage) {
//     if (params.new_tab) {
//       window.open(
//         `/hotels/${params.hotelSlugName}/booking?checkin=${formatTimestampToDateString(params.checkin.toISOString())}&checkout=${formatTimestampToDateString(params.checkout.toISOString())}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
//         "_blank",
//       );
//     } else if (params.push) {
//       const query: { [key: string]: string | string[] } = {
//         checkin: formatTimestampToDateString(params.checkin.toISOString()),
//         checkout: formatTimestampToDateString(params.checkout.toISOString()),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.push({
//         pathname: `/hotels/${params.hotelSlugName}/booking`,
//         query,
//       });
//     } else {
//       const query: { [key: string]: string | string[] } = {
//         checkin: formatTimestampToDateString(params.checkin.toISOString()),
//         checkout: formatTimestampToDateString(params.checkout.toISOString()),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.replace({
//         pathname: `/hotels/${params.hotelSlugName}/booking`,
//         query,
//       });
//     }
//   } else {
//     if (params.new_tab) {
//       window.open(
//         `/hotels/${params.hotelSlugName}/booking?checkin=${formatTimestampToDateString(params.checkin.toISOString())}&checkout=${formatTimestampToDateString(params.checkout.toISOString())}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
//         "_blank",
//       );
//     } else if (params.push) {
//       const query: { [key: string]: string | string[] } = {
//         checkin: formatTimestampToDateString(params.checkin.toISOString()),
//         checkout: formatTimestampToDateString(params.checkout.toISOString()),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         webpage: "true",
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.push({
//         pathname: `/hotels/${params.hotelSlugName}/booking`,
//         query,
//       });
//     } else {
//       const query: { [key: string]: string | string[] } = {
//         checkin: formatTimestampToDateString(params.checkin.toISOString()),
//         checkout: formatTimestampToDateString(params.checkout.toISOString()),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         webpage: "true",
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.replace({
//         pathname: `/hotels/${params.hotelSlugName}/booking`,
//         query,
//       });
//     }
//   }
// };

// //////////// Hotel Page Routers //////////

// export const routerToHotelDetailPage = async (
//   params: PageRouterQueryParams,
// ) => {
//   // get the desired formatted child ages string with key and value
//   // ex [2, 4] => child_age=0_2&child_age=1_4
//   const childAgeQuery = encodeChildAgesAsUrlParams(params.child_age);

//   if (!params.isWebpage) {
//     if (params.new_tab) {
//       window.open(
//         `/hotels/${params.hotelSlugName}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
//         "_blank",
//       );
//     } else if (params.push) {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.push({
//         pathname: `/hotels/${params.hotelSlugName}/`,
//         query,
//       });
//     } else {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.replace({
//         pathname: `/hotels/${params.hotelSlugName}/`,
//         query,
//       });
//     }
//   } else {
//     if (params.new_tab) {
//       window.open(
//         `/hotels/${params.hotelSlugName}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
//         "_blank",
//       );
//     } else if (params.push) {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//         webpage: "true",
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.push({
//         pathname: `/hotels/${params.hotelSlugName}/`,
//         query,
//       });
//     } else {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//         webpage: "true",
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.replace({
//         pathname: `/hotels/${params.hotelSlugName}/`,
//         query,
//       });
//     }
//   }
// };

// export const routerToHotelCityPageWindowObj = async (
//   citySlug: string,
//   RegionSlug: string,
//   params: PageRouterQueryParams,
// ) => {
//   let priceParam = "";
//   // Extract price value dynamically from 'under-{price}' pattern
//   const priceMatch = citySlug.match(/under-(\d+)/);
//   if (priceMatch) {
//     priceParam = priceMatch[1]; // Extracts the numeric value after 'under-'
//   }

//   // Extract rating dynamically from pattern like '3-star' in citySlug
//   let ratingParam = "";
//   const ratingMatch = citySlug.match(/^(\d+)-star/);
//   if (ratingMatch) {
//     ratingParam = `&rating=${ratingMatch[1]}`;
//   }

//   // Normalize citySlug while avoiding double "hotels-in-"
//   let cleanedCitySlug = citySlug
//     .replace(/-under-\d+/, "") // Remove -under-1000 etc.
//     .replace(/^\d+-star-hotels-in-/, "hotels-in-") // Fix 5-star-hotels-in-city
//     .replace(/^star-\d+-/, "hotels-in-") // Fix star-3-city
//     .replace(/^best-(luxury|cheap|affordable)-hotels-in-/, "hotels-in-") // Normalize best-* slugs
//     .replace(/^hotels-in-hotels-in-/, "hotels-in-"); // Remove accidental double hotels-in-

//   // Get formatted child ages string
//   const childAgeQuery = encodeChildAgesAsUrlParams(params.child_age);
//   // Construct the final URL
//   const url = `/${cleanedCitySlug}/${RegionSlug}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&hotelSlugFromSearch=${params.hotelSlugFromSearch}&${childAgeQuery}${priceParam ? `&price=${priceParam}` : ""}${ratingParam}`;

//   window.location.href = url;
// };

// import { TourBookingDetails } from "../classModels/bookings/tourBookingDetails";
// import { ActivityBookingDetails } from "../classModels/bookings/activityBookingDetails";

// export const routerToHotelCityPageWindowObjUpdate = async (
//   citySlug: string,
//   RegionSlug: string,
//   params: PageRouterQueryParams,
// ) => {
//   // get the desired formatted child ages string with key and value
//   // ex [2, 4] => child_age=0_2&child_age=1_4
//   const childAgeQuery = encodeChildAgesAsUrlParams(params.child_age);

//   const url = `/holidays/poi/${citySlug}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&hotelSlugFromSearch=${params.hotelSlugFromSearch}&${childAgeQuery}&price=&rating=`;
//   window.location.href = url;
// };

// export const routerToCityCountryPage = async (
//   citySlug: string,
//   hotelSlug: string,
//   RegionSlug: string,
//   countryCode: string,
//   params: PageRouterQueryParams,
// ) => {
//   // get the desired formatted child ages string with key and value
//   // ex [2, 4] => child_age=0_2&child_age=1_4
//   const childAgeQuery = encodeChildAgesAsUrlParams(params.child_age);

//   if (hotelSlug) {
//     const url = `/hotels/${hotelSlug}`;
//     window.location.href = url;
//     return;
//   }

//   const url = `/city/${countryCode}/${citySlug}/${RegionSlug}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&hotel_slug=${hotelSlug}&${childAgeQuery}`;
//   window.location.href = url;
// };

// export const routerToAllRoomsPage = async (params: PageRouterQueryParams) => {
//   // get the desired formatted child ages string with key and value
//   // ex [2, 4] => child_age=0_2&child_age=1_4
//   const childAgeQuery = encodeChildAgesAsUrlParams(params.child_age);

//   if (!params.isWebpage) {
//     if (params.new_tab) {
//       window.open(
//         `/hotels/${params.hotelSlugName}/rooms?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
//         "_blank",
//       );
//     } else if (params.push) {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.push({
//         pathname: `/hotels/${params.hotelSlugName}/rooms`,
//         query,
//       });
//     } else {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.replace({
//         pathname: `/hotels/${params.hotelSlugName}/rooms`,
//         query,
//       });
//     }
//   } else {
//     if (params.new_tab) {
//       window.open(
//         `/hotels/${params.hotelSlugName}/rooms?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}&webpage=true`,
//         "_blank",
//       );
//     } else if (params.push) {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//         webpage: "true",
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.push({
//         pathname: `/hotels/${params.hotelSlugName}/rooms`,
//         query,
//       });
//     } else {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//         webpage: "true",
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.replace({
//         pathname: `/hotels/${params.hotelSlugName}/rooms`,
//         query,
//       });
//     }
//   }
// };

// export const routerToRoomDetailPage = async (params: PageRouterQueryParams) => {
//   // get the desired formatted child ages string with key and value
//   // ex [2, 4] => child_age=0_2&child_age=1_4
//   const childAgeQuery = encodeChildAgesAsUrlParams(params.child_age);

//   if (!params.isWebpage) {
//     if (params.push) {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.push({
//         pathname: `/hotels/${params.hotelSlugName}/rooms/${params.roomId}`,
//         query,
//       });
//     } else if (params.new_tab) {
//       window.open(
//         `/hotels/${params.hotelSlugName}/rooms/${params.roomId}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
//         "_blank",
//       );
//     } else {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.replace({
//         pathname: `/hotels/${params.hotelSlugName}/rooms/${params.roomId}`,
//         query,
//       });
//     }
//   } else {
//     if (params.push) {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//         webpage: "true",
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.push({
//         pathname: `/hotels/${params.hotelSlugName}/rooms/${params.roomId}`,
//         query,
//       });
//     } else {
//       const query: { [key: string]: string | string[] } = {
//         checkin: String(format(params.checkin, "dd-MM-yyyy")),
//         checkout: String(format(params.checkout, "dd-MM-yyyy")),
//         num_nights: String(params.num_nights),
//         num_guests: String(params.num_guests),
//         num_adults: String(params.num_adults),
//         num_rooms: String(params.num_rooms),
//         num_children: String(params.num_children),
//         webpage: "true",
//       };

//       // Add all child ages in the desired format
//       query.child_age = params.child_age.map(
//         (age: number, index: number) => `${index}_${age}`,
//       );

//       params.router.replace({
//         pathname: `/hotels/${params.hotelSlugName}/rooms/${params.roomId}`,
//         query,
//       });
//     }
//   }
// };

// ///////////// City/Region Page Router //////////////

// export const routerToHotelCityPage = async (
//   citySlug: string,
//   RegionSlug: string,
//   params: PageRouterQueryParams,
// ) => {
//   const constructChildAge = params.child_age.map((age, idx) => ({
//     idx,
//     age,
//     price: 0,
//     status: true,
//   }));
//   // Step 2: Convert to array of '0_13', '1_15', etc.
//   const childAgeParams = constructChildAge.map(
//     (child) => `${child.idx}_${child.age}`,
//   );

//   params.router.push({
//     pathname: `/${citySlug}/${RegionSlug}`,
//     query: {
//       checkin: String(format(params.checkin, "dd-MM-yyyy")),
//       checkout: String(format(params.checkout, "dd-MM-yyyy")),
//       num_nights: String(params.num_nights),
//       num_guests: String(params.num_guests),
//       num_adults: String(params.num_adults),
//       num_rooms: String(params.num_rooms),
//       num_children: String(params.num_children),
//       hotelSlugFromSearch: String(params.hotelSlugFromSearch),
//       child_age: childAgeParams,
//     },
//   });
// };

// export const routerToCityRegionPage = async (
//   slug: string,
//   params: PageRouterQueryParams,
// ) => {
//   let query: { [key: string]: string | string[] } = {
//     checkin: String(format(params.checkin, "dd-MM-yyyy")),
//     checkout: String(format(params.checkout, "dd-MM-yyyy")),
//     num_nights: String(params.num_nights),
//     num_guests: String(params.num_guests),
//     num_adults: String(params.num_adults),
//     num_rooms: String(params.num_rooms),
//     num_children: String(params.num_children),
//   };
//   query.child_age = params.child_age.map(
//     (age: number, index: number) => `${index}_${age}`,
//   );
//   query.hotelSlugFromSearch = String(params.hotelSlugFromSearch);
//   query.searchedQuery = String(params.searchedQuery);

//   // redirect the user to city or city region page
//   params.router.push({
//     pathname: `/${slug}`,
//     query,
//   });
// };

//////////////// things to do /////////////////////
export const routerToThingsToDoBookingPage = (
  slug: string,
  params: PageRouterQueryParams
) => {
  const { router, searchedQuery } = params;

  if (!searchedQuery || !slug) {
    console.warn("Missing slug or searchedQuery for redirect");
    return;
  }

  router.push(`/things-to-do/${searchedQuery}/${slug}`);
};


/**
 * Redirects the user to the Things-to-Do payment page.
 */
export const routerToThingsToDoPaymentPage = (
  slug: string,
  params: PageRouterQueryParams
) => {
  const { router, searchedQuery } = params;

  if (!searchedQuery || !slug) {
    console.warn("Missing slug or searchedQuery for redirect");
    return;
  }

  // Push to the payment page URL
  router.push(`/things-to-do/${searchedQuery}/${slug}`);
};

// export const routerToActivityBookingPage = async (
//   slug: string,
//   params: PageRouterQueryParams,
// ) => {
//   // redirect the user to things-to-do booking page
//   params.router.push({
//     pathname: `/activities/${params.searchedQuery}/${slug}`,
//     // query,
//   });
// };

// export const routerToHolidaysBookingPage = async (
//   slug: string,
//   params: PageRouterQueryParams,
// ) => {
//   let query: { [key: string]: string | string[] } = {
//     checkin: String(format(params.checkin, "dd-MM-yyyy")),
//     num_guests: String(params.num_guests),
//     num_adults: String(params.num_adults),
//     num_children: String(params.num_children),
//   };

//   // redirect the user to things-to-do booking page
//   params.router.push({
//     pathname: `/holidays/${params.searchedQuery}/${slug}`,
//     query,
//   });
// };

// export const routerToThingsToDoPaymentPage = async (
//   slug: string,
//   params: PageRouterQueryParams,
// ) => {
//   // redirect the user to things-to-do booking page
//   params.router.push({
//     pathname: `/things-to-do/${params.searchedQuery}/${slug}`,
//   });
// };

// export const routerToActivityPaymentPage = async (
//   slug: string,
//   params: PageRouterQueryParams,
// ) => {
//   // redirect the user to things-to-do booking page
//   params.router.push({
//     pathname: `/activities/${params.searchedQuery}/${slug}`,
//   });
// };

// export const routerToHolidaysPaymentPage = async (
//   slug: string,
//   params: PageRouterQueryParams,
// ) => {
//   let query: { [key: string]: string | string[] } = {
//     checkin: String(format(params.checkin, "dd-MM-yyyy")),
//     num_guests: String(params.num_guests),
//     num_adults: String(params.num_adults),
//     num_children: String(params.num_children),
//   };

//   // redirect the user to things-to-do booking page
//   params.router.push({
//     pathname: `/holidays/${params.searchedQuery}/${slug}`,
//     query,
//   });
// };

export const routerToTourConfirmationPage = (
  router: any,
  bookingInfo: TourBookingDetails
) => {
  if (!router || !bookingInfo?.booking_Id) {
    console.warn("Missing router or booking info for redirect");
    return;
  }

  router.replace({
    pathname: `/bookingInformation/things-to-do/${bookingInfo.booking_Id}`,
    query: {
      booking_status: "Booking Successful",
      tour_Id: bookingInfo.tour_Slug_Name,
      tour_Name: bookingInfo.tour_Name,
      user_Name: bookingInfo.user_Name,
      user_Email: bookingInfo.user_Email_Id,
      user_Phone: bookingInfo.user_Phone_Number,
      booking_receipt: bookingInfo.receipt_Id,
    },
  });
};


// export const routerToActivitiesConfirmationPage = (
//   router: any,
//   bookingInfo: ActivityBookingDetails,
// ) => {
//   router.replace({
//     pathname: `/bookingInformation/activities/${bookingInfo.booking_Id}`,
//     query: {
//       booking_status: "Booking Successful",
//       activity_Id: bookingInfo.activity_Slug_Name,
//       activity_Name: bookingInfo.activity_Name,
//       user_Name: bookingInfo.user_Name,
//       user_Email: bookingInfo.user_Email_Id,
//       user_Phone: bookingInfo.user_Phone_Number,
//       booking_receipt: bookingInfo.receipt_Id,
//     },
//   });
// };
