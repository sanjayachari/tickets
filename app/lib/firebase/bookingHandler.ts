// import { formatDateForBookingMail, generateStringSymbols } from "@/src/utils";
// import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
import {
  BOOKED_ROOMS_COLLECTION_NAME,
  HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
  PAYMENT_INFO_COLLECTION_NAME,
  STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
  STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
  TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
  TOUR_AND_TRAVEL_COLLECTION_NAME,
  TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
  TOUR_BOOKING_COLLECTION_NAME,
  USER_BOOKINGS_COLLECTION_NAME,
} from "../helper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from ".";
// import { RoomDetails } from "@/lib/classModels/bookings/roomDetails";
// import {
//   sendUserBookingConfirmationMail,
//   sendHotelierBookingConfirmationMail,
// } from "../handlers/mailService";
// import { TourPackageInfo } from "../classModels/tourAndTravels/TourPackageInfo";
// import { getRoomImage } from "./hotelRoomHandler";
import { generateStringSymbols } from "../utils/generateStringSymbols/generateStringSymbols";
import { formatDateForBookingMail } from "../utils/formatDateForBookingMail/formatDateForBookingMail";
import { BookingDetails } from "@/app/classes/bookings/bookingDetails";
import { TourPackageInfo } from "@/app/classes/tourAndTravels/TourPackageInfo";

const getCurrentDayCollectionName = (): string => {
  let currDate = new Date();
  let dateVal = currDate.getDate().toString().padStart(2, "0");
  let yearVal = currDate.getFullYear();
  let monthVal = (currDate.getMonth() + 1).toString().padStart(2, "0");
  return `${dateVal}-${monthVal}-${yearVal}`;
};

export const bookingConfirmationRedirector = (
  router: any,
  booking_Id: string,
  receipt_Id: string,
  userBooking: BookingDetails,
) => {
  router.replace({
    pathname: `/bookingInformation/${booking_Id}/`,
    query: {
      booking_status: "Booking Successful",
      hotel_Id: userBooking.hotel_Slug_Name,
      hotel_Name: userBooking.hotel_Name,
      user_Name: userBooking.user_Name,
      user_Email: userBooking.user_Email_Id,
      user_Phone: userBooking.user_Phone_Number,
      booking_receipt: receipt_Id,
    },
  });
};

// export const getBookingPaymentInfo = async (bookingId: string) => {
//   const bookingCollectionRef = doc(
//     db,
//     STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
//     STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
//     PAYMENT_INFO_COLLECTION_NAME,
//     bookingId,
//   );

//   console.log(bookingCollectionRef.path);
//   let booking = await getDoc(bookingCollectionRef);

//   let bookingInfo: any = {};
//   const bookedRoomsCollectionRef = collection(
//     db,
//     STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
//     STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
//     PAYMENT_INFO_COLLECTION_NAME,
//     bookingId,
//     HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
//   );

//   const roomsQuerySnapshot = await getDocs(query(bookedRoomsCollectionRef));

//   let roomsList: RoomDetails[] = [];
//   for (let room of roomsQuerySnapshot.docs) {
//     let roomInfo = new RoomDetails();
//     roomInfo.num_Children = room.data().num_Children;
//     roomInfo.num_Guests = room.data().num_Guests;
//     roomInfo.plan_Child_Price = room.data().plan_Children_Price;
//     roomInfo.plan_Id = room.data().plan_Id;
//     roomInfo.plan_Info = room.data().plan_Info;
//     roomInfo.plan_Name = room.data().plan_Name;
//     roomInfo.room_Children_Age_Price_Info =
//       room.data().room_Children_Age_Price_Info;

//     roomInfo.priceBreakUp = room.data().priceBreakUp;
//     if (room.data().priceBreakUp) {
//       for (let pd of room.data().priceBreakUp) {
//         roomInfo.plan_Room_Price += +pd.basePrice;
//         roomInfo.plan_Tax += +pd.basePrice;
//         roomInfo.plan_Tax += +pd.taxPrice;
//         roomInfo.plan_Price += +pd.totalPrice;
//       }
//     }

//     if (Math.floor(roomInfo.plan_Room_Price) === 0) {
//       roomInfo.plan_Room_Price = room.data().plan_Room_Price;
//       roomInfo.plan_Tax = room.data().plan_Tax;
//       roomInfo.plan_Price = room.data().plan_Price;
//     }

//     roomInfo.room_Count = room.data().room_Count;
//     roomInfo.room_Guest_Occupancy = room.data().room_Guest_Occupancy;
//     roomInfo.room_Id = room.id;
//     roomInfo.room_Name = room.data().room_Name;
//     roomInfo.room_Info = room.data().room_Info;

//     roomInfo.total_Room_Plan_Price = room.data().total_Room_Plan_Price;
//     roomInfo.total_Plan_Tax = room.data().total_Plan_Tax;
//     roomInfo.total_Plan_Price = room.data().total_Plan_Price;

//     const imageUrl = await getRoomImage(
//       booking?.data()?.hotel_Slug_Name,
//       bookingId,
//       roomInfo.plan_Id,
//     );
//     roomInfo.room_Image_Url = imageUrl ? imageUrl : "";

//     roomsList.push(roomInfo);
//   }
//   bookingInfo = { ...booking.data() };
//   bookingInfo["roomsList"] = roomsList;

//   return bookingInfo;
// };


// export const getBookedHotelDetails = async (
//   userEmailId: string,
//   bookingId: string,
// ) => {
//   const docRef = doc(
//     db,
//     USER_BOOKINGS_COLLECTION_NAME,
//     userEmailId,
//     BOOKED_ROOMS_COLLECTION_NAME,
//     bookingId,
//   );
//   const booking = await getDoc(docRef);

//   const bookedRoomsCollectionRef = collection(
//     db,
//     USER_BOOKINGS_COLLECTION_NAME,
//     userEmailId,
//     BOOKED_ROOMS_COLLECTION_NAME,
//     bookingId,
//     HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
//   );
//   let bookingInfo = new BookingDetails();

//   let bookedRoomsList: RoomDetails[] = [];
//   const roomsQuerySnapshot = await getDocs(bookedRoomsCollectionRef);

//   let gc = 0;
//   for (let room of roomsQuerySnapshot.docs) {
//     let roomInfo = new RoomDetails();
//     roomInfo.room_Id = room.id;
//     roomInfo.room_Name = room.data().room_Name;
//     roomInfo.room_Info = room.data().room_Info;
//     roomInfo.room_Count = room.data().room_Count;
//     roomInfo.plan_Id = room.data().plan_Id;
//     roomInfo.plan_Name = room.data().plan_Name;
//     roomInfo.plan_Info = room.data().plan_Info;
//     roomInfo.plan_Price = room.data().plan_Price;
//     roomInfo.num_Guests = room.data().num_Guests;
//     gc += room.data().num_Guests * room.data().room_Count;
//     roomInfo.num_Children = room.data().num_Children;
//     bookedRoomsList.push(roomInfo);
//   }

//   bookingInfo.roomsList = bookedRoomsList;
//   bookingInfo.booking_Id = booking.id;
//   bookingInfo.hotel_Image_Url = booking.data()?.hotel_Image_Url;
//   bookingInfo.hotel_Name = booking.data()?.hotel_Name;
//   bookingInfo.hotel_Landmark = booking.data()?.hotel_Landmark;
//   bookingInfo.hotel_Owner_Id = booking.data()?.hotel_Owner_Id;
//   bookingInfo.hotel_Firebase_Id = booking.data()?.hotel_Firebase_Id;
//   bookingInfo.user_Unique_Id = booking.data()?.user_Unique_Id;
//   bookingInfo.user_Email_Id = booking.data()?.user_Email_Id;
//   bookingInfo.user_Name = booking.data()?.user_Name;
//   bookingInfo.user_Phone_Number = booking.data()?.user_Phone_Number;
//   bookingInfo.total_Rooms_Count = booking.data()?.total_Rooms_Count;
//   bookingInfo.total_Room_Cost = booking.data()?.total_Room_Cost;
//   bookingInfo.total_Tax = booking.data()?.total_Tax;
//   bookingInfo.total_Price = booking.data()?.total_Price;
//   bookingInfo.payment_Made = booking.data()?.payment_Made;
//   bookingInfo.amount_Paid = booking.data()?.amount_Paid;
//   bookingInfo.booking_Time = new Date(booking.data()?.booking_Time);
//   bookingInfo.checkin_Time = new Date(booking.data()?.checkin_Time);
//   bookingInfo.checkout_Time = new Date(booking.data()?.checkout_Time);
//   bookingInfo.razorpay_Payment_Id = booking.data()?.razorpay_Payment_Id;
//   bookingInfo.razorpay_Order_Id = booking.data()?.razorpay_Order_Id;
//   bookingInfo.razorpay_Signature_Id = booking.data()?.razorpay_Signature_Id;
//   bookingInfo.receipt_Id = booking.data()?.receipt_Id;
//   bookingInfo.total_Rooms_Count = booking.data()?.total_Rooms_Count;
//   bookingInfo.total_Guests_Count = booking.data()?.total_Guests_Count
//     ? booking.data()?.total_Guests_Count
//     : gc;

//   return JSON.stringify(bookingInfo);
// };

export const whatsAppAPICaller = async (
  userBooking: BookingDetails,
  checkInDate: string,
  checkOutDate: string,
  bookingMessage: string,
) => {
  const response = await fetch("/api/bookingWhatsApp", {
    method: "POST",
    body: JSON.stringify({
      userBooking: userBooking,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      bookingMessage: bookingMessage,
    }),
  });
};

// export const hotelBookingHandler = async (
//   userBooking: BookingDetails,
//   prepaid: boolean = false,
// ) => {
//   let colName = getCurrentDayCollectionName();
//   const response = await fetch("/api/booking/setHotelBooking", {
//     method: "POST",
//     body: JSON.stringify({
//       userBooking: userBooking,
//       currentDateCollection: colName,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await response.json();
//   if (data.receipt_Id !== "" || userBooking.payment_Made || prepaid) {
//     userBooking.booking_Id = data.booking_Id;
//     let checkInDate = formatDateForBookingMail(userBooking.checkin_Time);
//     let checkOutDate = formatDateForBookingMail(userBooking.checkout_Time);
//     let hotelStars = generateStringSymbols(userBooking.hotel_Star_Rating);
//     let bookingMessage = "";
//     if (userBooking.amount_Paid) {
//       bookingMessage = `You have paid the full amount (₹${Math.ceil(
//         userBooking.amount_Paid,
//       )}) in advance.`;
//     } else {
//       bookingMessage = `You have to pay the remaining booking amount of INR ₹${Math.ceil(
//         userBooking.total_Price,
//       )} at the time of check-in.`;
//     }
//     // whatsAppAPICaller(userBooking, checkInDate, checkOutDate, bookingMessage);
//     let guestCount = 0;
//     let roomsInfo = "";
//     userBooking.roomsList.forEach((room: RoomDetails) => {
//       roomsInfo += `${room.room_Name} booked with room plan: ${room.plan_Info}, \n`;
//       guestCount += room.num_Guests * room.room_Count;
//     });
//     sendUserBookingConfirmationMail(
//       userBooking,
//       checkInDate,
//       checkOutDate,
//       hotelStars,
//       bookingMessage,
//       roomsInfo,
//     );
//     sendHotelierBookingConfirmationMail(
//       userBooking,
//       checkInDate,
//       checkOutDate,
//       hotelStars,
//       bookingMessage,
//       roomsInfo,
//     );
//   }

//   return data;
// };

export const fetchUserPersonalDetails = async (userBooking: BookingDetails) => {
  const response = await fetch("/api/userProfile/fetchUserDetails", {
    method: "POST",
    body: JSON.stringify({
      userBooking: userBooking,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.userCredentials) {
    if (data.userCredentials.User_First_Name === "") {
      userBooking.user_Name = data.userCredentials.User_Display_Name;
    } else {
      userBooking.user_Name =
        data.userCredentials.User_First_Name +
        " " +
        data.userCredentials.User_Middle_Name +
        " " +
        data.userCredentials.User_Last_Name;
    }
    userBooking.user_Phone_Number = data.userCredentials.User_Mobile_Number;
    userBooking.user_Email_Id = data.userCredentials.User_Email_Id;
  }

  return userBooking;
};

export const generalNearybyPackages = async (city: string) => {
  let cleanedCity = city.trim().toLowerCase();

  // Replace "new-delhi" specifically with "delhi"
  if (cleanedCity === "new-delhi") {
    cleanedCity = "delhi";
  }

  // Capitalize first letter
  const formattedCity =
    cleanedCity.charAt(0).toUpperCase() + cleanedCity.slice(1);

  const docRef = collection(
    db,
    TOUR_AND_TRAVEL_COLLECTION_NAME,
    TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
    TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
  );

  const querySnap = await getDocs(
    query(
      docRef,
      where("tour_City_Covered", "array-contains", formattedCity),
      limit(10),
    ),
  );

  const nearbyPackages = querySnap.docs.map((doc) => ({
    ...doc.data(),
  })) as TourPackageInfo[];

  return nearbyPackages;
};
