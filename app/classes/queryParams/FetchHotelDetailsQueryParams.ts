import { formatDateToString, manipulateDateByDays } from "@/src/utils";

export class FetchHotelDetailsQueryParams {
  hotelSlugName: string = "";
  roomId: string = "";
  planId: string = "";
  numGuests: number = 2;
  childAgeList: any[] = [];
  checkInDate: Date = new Date();
  checkOutDate: Date = manipulateDateByDays(new Date(), 1);
  formattedCheckin: string = formatDateToString(new Date());
  formattedCheckout: string = formatDateToString(
    manipulateDateByDays(new Date(), 1),
  );

  fetchHotelAmenityList: boolean = false;
  amenityListSize: number = 5;
  fetchHotelFAQList: boolean = false;
  faqListSize: number = 100;
  fetchHotelImageList: boolean = false;
  fetchHotelReviewsList: boolean = false;
  fetchHotelNearbyPlacesList: boolean = false;
  fetchHotelNearbyHotelsList: boolean = false;
  fetchHotelRoomsList: boolean = false;
  fetchAllHotelRoomsList: boolean = false;
}
