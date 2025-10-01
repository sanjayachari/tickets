import { doc, setDoc, collection, addDoc } from "firebase/firestore";
// import { BookingDetails } from "../classModels/bookings/bookingDetails";
import { db } from "../firebase";
// import { generateAlphaNumericUniqueId } from "@/src/utils";
import {
  STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
  PAYMENT_INFO_COLLECTION_NAME,
  HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
  WEBSITE_BASE_URL,
  STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
  STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
  TOUR_PLANS_BOOKING_COLLECTION_NAME,
  VISA_PAYMENT_QUERY_SECTION,
  STAYBOOK_ACTIVITY_BOOKINGS_SECTION_NAME,
  ACTIVITY_PLANS_BOOKING_COLLECTION_NAME,
  USER_BOOKINGS_COLLECTION_NAME,
  HOTEL_BOOKINGS_COLLECTION_NAME,
} from "../helper";
import { TourBookingDetails } from "@/app/classes/bookings/tourBookingDetails";
// import { TourBookingDetails } from "../classModels/bookings/tourBookingDetails";
// import { VisaInqueryDetails } from "../classModels/bookings/visaInqueryDetails";
// import generateUniqueId from "generate-unique-id";

// export const visaPaymentQueryCreation = async (
//   visaQuery: VisaInqueryDetails,
// ) => {
//   try {
//     const docQueryRef = doc(
//       db,
//       STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
//       VISA_PAYMENT_QUERY_SECTION,
//       PAYMENT_INFO_COLLECTION_NAME,
//       visaQuery.visa_Request_Id,
//     );

//     const response = await setDoc(docQueryRef, {
//       ...visaQuery,
//       visa_Query_Time: new Date(),
//     });

//     return { status: true, data: response };
//   } catch (error) {
//     console.log("Visa Payment Query Creation: ", error);
//     return {
//       status: false,
//       data: null,
//     };
//   }
// };

// export const hotelPaymentInfoCreation = async (userBooking: BookingDetails) => {
//   try {
//     // If the userbooking.checkin or checkout time has GMT+ in the string then add 8 hours 30 minutes to it
//     if (userBooking.checkin_Time.includes("GMT+")) {
//       const checkinDate = new Date(userBooking.checkin_Time);
//       checkinDate.setHours(checkinDate.getHours() + 8);
//       checkinDate.setMinutes(checkinDate.getMinutes() + 30);
//       userBooking.checkin_Time = checkinDate.toISOString();
//     }
//     if (userBooking.checkout_Time.includes("GMT+")) {
//       const checkoutDate = new Date(userBooking.checkout_Time);
//       checkoutDate.setHours(checkoutDate.getHours() + 8);
//       checkoutDate.setMinutes(checkoutDate.getMinutes() + 30);
//       userBooking.checkout_Time = checkoutDate.toISOString();
//     }

//     const docBookingRef = doc(
//       db,
//       STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
//       STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
//       PAYMENT_INFO_COLLECTION_NAME,
//       userBooking.booking_Id,
//     );

//     const response = await setDoc(docBookingRef, {
//       booking_Type: "hotel",
//       booking_Confirmation: false,
//       booking_Id: userBooking.booking_Id,
//       booking_Time: new Date(),
//       checkin_Time: new Date(userBooking.checkin_Time),
//       checkout_Time: new Date(userBooking.checkout_Time),
//       hotel_Name: userBooking.hotel_Name,
//       hotel_Slug_Name: userBooking.hotel_Slug_Name,
//       hotel_Image_Url: userBooking.hotel_Image_Url,
//       hotel_Landmark: userBooking.hotel_Landmark,
//       hotel_Firebase_Id: userBooking.hotel_Firebase_Id,
//       hotel_Email_Id: userBooking.hotel_Email_Id,
//       hotel_Arrival_Time: userBooking.hotel_Arrival_Time,
//       hotel_Departure_Time: userBooking.hotel_Departure_Time,
//       hotel_Partner_Paid_Amount: userBooking.hotel_Partner_Paid_Amount,
//       hotel_Map_Url: userBooking.hotel_Map_Url,
//       hotel_General_Policy: userBooking.hotel_General_Policy,
//       hotel_City_Slug: userBooking.hotel_City_Slug,
//       hotel_Cancellation_Policy: userBooking.hotel_Cancellation_Policy,
//       hotel_Refund_Policy: userBooking.hotel_Refund_Policy,
//       user_Instructions: userBooking.user_Instructions,
//       hotel_Owner_Id: userBooking.hotel_Owner_Id,
//       payment_Gateway: userBooking.payment_Gateway,
//       payment_Type: userBooking.payment_Type,
//       booking_Created_From: userBooking.booking_Created_From,
//       total_Rooms_Count: userBooking.total_Rooms_Count,
//       total_Room_Cost: Math.ceil(userBooking.total_Room_Cost),
//       total_Tax: Math.ceil(userBooking.total_Tax),
//       total_Price: Math.ceil(userBooking.total_Price),
//       paying_Amount: Math.ceil(userBooking.paying_Amount),
//       handling_Charges: userBooking.hotel_Handling_Charges,
//       payment_Made: userBooking.payment_Made,
//       amount_Paid: Math.ceil(userBooking.amount_Paid),
//       payment_Testing_Info: userBooking.payment_Testing_Info,
//       booking_Currency_Code: userBooking.booking_Currency_Code,
//       booking_Currency_Symbol: userBooking.booking_Currency_Symbol,
//       booking_Status: true,
//       booking_Checkin_Status: false,
//       booking_Noshow_Status: false,
//       booking_Cancelled_Status: false,
//       user_Unique_Id: userBooking.user_Unique_Id,
//       user_Name: userBooking.user_Name,
//       user_Address: userBooking.user_Address,
//       user_Email_Id: userBooking.user_Email_Id,
//       user_Phone_Number: userBooking.user_Phone_Number,
//       booking_Coins: 0,
//       total_Guests_Count: userBooking.total_Guests_Count,
//       total_Children_Count: userBooking.total_Children_Count,
//       booking_Confirmation_Url: `https://${WEBSITE_BASE_URL}/bookingInformation/${userBooking.booking_Id}?booking_status=${`Booking Successful`}&hotel_Id=${userBooking.hotel_Slug_Name}&hotel_Name=${userBooking.hotel_Name}&user_Name=${userBooking.user_Name}&user_Email=${userBooking.user_Email_Id}&user_Phone=${userBooking.user_Phone_Number}&booking_receipt=${userBooking.receipt_Id}`,
//       booking_Redirect_Url: `/bookingInformation/${userBooking.booking_Id}?booking_status=${`Booking Successful`}&hotel_Id=${userBooking.hotel_Slug_Name}&hotel_Name=${userBooking.hotel_Name}&user_Name=${userBooking.user_Name}&user_Email=${userBooking.user_Email_Id}&user_Phone=${userBooking.user_Phone_Number}&booking_receipt=${userBooking.receipt_Id}`,

//       razorpay_Payment_Id: userBooking.razorpay_Payment_Id,
//       razorpay_Order_Id: userBooking.razorpay_Order_Id,
//       razorpay_Signature_Id: userBooking.razorpay_Signature_Id,
//       receipt_Id: userBooking.receipt_Id,
//     });

//     for (let i = 0; i < userBooking.roomsList.length; i++) {
//       const roomCollectionRef = collection(
//         db,
//         STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
//         STAYBOOK_HOTEL_BOOKINGS_SECTION_NAME,
//         PAYMENT_INFO_COLLECTION_NAME,
//         userBooking.booking_Id,
//         HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
//       );
//       const roomRef = await addDoc(roomCollectionRef, {
//         room_Id: userBooking.roomsList[i].room_Id,
//         room_Name: userBooking.roomsList[i].room_Name,
//         room_Info: userBooking.roomsList[i].room_Info,
//         room_Image_Url: userBooking.roomsList[i].room_Image_Url,
//         plan_Id: userBooking.roomsList[i].plan_Id,
//         plan_Name: userBooking.roomsList[i].plan_Name,
//         plan_Info: userBooking.roomsList[i].plan_Info,
//         room_Guest_Occupancy: userBooking.roomsList[i].room_Guest_Occupancy,
//         room_Children_Occupancy:
//           userBooking.roomsList[i].room_Children_Occupancy,

//         plan_End_Date: new Date(userBooking.roomsList[i].plan_End_Date),
//         plan_Start_Date: new Date(userBooking.roomsList[i].plan_Start_Date),

//         room_Count: userBooking.roomsList[i].room_Count,
//         num_Guests: userBooking.roomsList[i].num_Guests,
//         num_Children: userBooking.roomsList[i].num_Children,

//         plan_Child_Price: userBooking.roomsList[i].plan_Child_Price,
//         plan_Room_Price: userBooking.roomsList[i].plan_Room_Price,
//         plan_Tax: userBooking.roomsList[i].plan_Tax,
//         plan_Price: userBooking.roomsList[i].plan_Price,
//         priceBreakUp: userBooking.roomsList[i].priceBreakUp,
//         room_Children_Age_Price_Info:
//           userBooking.roomsList[i].room_Children_Age_Price_Info,

//         total_Room_Plan_Price: userBooking.roomsList[i].total_Room_Plan_Price,
//         total_Plan_Tax: userBooking.roomsList[i].total_Plan_Tax,
//         total_Plan_Price: userBooking.roomsList[i].total_Plan_Price,
//       });
//     }

//     return { status: true, data: response };
//   } catch (error) {
//     console.log("hotel payment info Creation: ", error);
//     return {
//       status: false,
//       data: null,
//       id: generateAlphaNumericUniqueId(),
//     };
//   }
// };

// export const  userBookingInfoCreation = async (userBooking: BookingDetails) => {
//   try {
//     // If the userbooking.checkin or checkout time has GMT+ in the string then add 8 hours 30 minutes to it
//     if (userBooking.checkin_Time.includes("GMT+")) {
//       const checkinDate = new Date(userBooking.checkin_Time);
//       checkinDate.setHours(checkinDate.getHours() + 8);
//       checkinDate.setMinutes(checkinDate.getMinutes() + 30);
//       userBooking.checkin_Time = checkinDate.toISOString();
//     }
//     if (userBooking.checkout_Time.includes("GMT+")) {
//       const checkoutDate = new Date(userBooking.checkout_Time);
//       checkoutDate.setHours(checkoutDate.getHours() + 8);
//       checkoutDate.setMinutes(checkoutDate.getMinutes() + 30);
//       userBooking.checkout_Time = checkoutDate.toISOString();
//     }

//     const docBookingRef = doc(
//       db,
//       USER_BOOKINGS_COLLECTION_NAME,
//       userBooking.user_Email_Id.toLowerCase(),
//       HOTEL_BOOKINGS_COLLECTION_NAME,
//       userBooking.booking_Id,
//     );

//     const response = await setDoc(docBookingRef, {
//       booking_Type: "hotel",
//       booking_Confirmation: false,
//       booking_Id: userBooking.booking_Id,
//       booking_Time: new Date(),
//       checkin_Time: new Date(userBooking.checkin_Time),
//       checkout_Time: new Date(userBooking.checkout_Time),
//       hotel_Name: userBooking.hotel_Name,
//       hotel_Slug_Name: userBooking.hotel_Slug_Name,
//       hotel_Image_Url: userBooking.hotel_Image_Url,
//       hotel_Landmark: userBooking.hotel_Landmark,
//       hotel_Firebase_Id: userBooking.hotel_Firebase_Id,
//       hotel_Email_Id: userBooking.hotel_Email_Id,
//       hotel_Arrival_Time: userBooking.hotel_Arrival_Time,
//       hotel_Departure_Time: userBooking.hotel_Departure_Time,
//       hotel_Partner_Paid_Amount: userBooking.hotel_Partner_Paid_Amount,
//       hotel_Map_Url: userBooking.hotel_Map_Url,
//       hotel_General_Policy: userBooking.hotel_General_Policy,
//       hotel_City_Slug: userBooking.hotel_City_Slug,
//       hotel_Cancellation_Policy: userBooking.hotel_Cancellation_Policy,
//       hotel_Refund_Policy: userBooking.hotel_Refund_Policy,
//       user_Instructions: userBooking.user_Instructions,
//       hotel_Owner_Id: userBooking.hotel_Owner_Id,
//       payment_Gateway: userBooking.payment_Gateway,
//       payment_Type: userBooking.payment_Type,
//       booking_Created_From: userBooking.booking_Created_From,
//       total_Rooms_Count: userBooking.total_Rooms_Count,
//       total_Room_Cost: Math.ceil(userBooking.total_Room_Cost),
//       total_Tax: Math.ceil(userBooking.total_Tax),
//       total_Price: Math.ceil(userBooking.total_Price),
//       paying_Amount: Math.ceil(userBooking.paying_Amount),
//       handling_Charges: userBooking.hotel_Handling_Charges,
//       payment_Made: userBooking.payment_Made,
//       amount_Paid: Math.ceil(userBooking.amount_Paid),
//       payment_Testing_Info: userBooking.payment_Testing_Info,
//       booking_Currency_Code: userBooking.booking_Currency_Code,
//       booking_Currency_Symbol: userBooking.booking_Currency_Symbol,
//       booking_Status: true,
//       booking_Checkin_Status: false,
//       booking_Noshow_Status: false,
//       booking_Cancelled_Status: false,
//       user_Unique_Id: userBooking.user_Unique_Id,
//       user_Name: userBooking.user_Name,
//       user_Address: userBooking.user_Address,
//       user_Email_Id: userBooking.user_Email_Id,
//       user_Phone_Number: userBooking.user_Phone_Number,
//       booking_Coins: 0,
//       total_Guests_Count: userBooking.total_Guests_Count,
//       total_Children_Count: userBooking.total_Children_Count,
//       booking_Confirmation_Url: `https://${WEBSITE_BASE_URL}/bookingInformation/${userBooking.booking_Id}?booking_status=${`Booking Successful`}&hotel_Id=${userBooking.hotel_Slug_Name}&hotel_Name=${userBooking.hotel_Name}&user_Name=${userBooking.user_Name}&user_Email=${userBooking.user_Email_Id}&user_Phone=${userBooking.user_Phone_Number}&booking_receipt=${userBooking.receipt_Id}`,
//       booking_Redirect_Url: `/bookingInformation/${userBooking.booking_Id}?booking_status=${`Booking Successful`}&hotel_Id=${userBooking.hotel_Slug_Name}&hotel_Name=${userBooking.hotel_Name}&user_Name=${userBooking.user_Name}&user_Email=${userBooking.user_Email_Id}&user_Phone=${userBooking.user_Phone_Number}&booking_receipt=${userBooking.receipt_Id}`,
//       razorpay_Payment_Id: userBooking.razorpay_Payment_Id,
//       razorpay_Order_Id: userBooking.razorpay_Order_Id,
//       razorpay_Signature_Id: userBooking.razorpay_Signature_Id,
//       receipt_Id: userBooking.receipt_Id,
//     });

//     for (let i = 0; i < userBooking.roomsList.length; i++) {
//       const roomCollectionRef = collection(
//         db,
//         USER_BOOKINGS_COLLECTION_NAME,
//         userBooking.user_Email_Id.toLowerCase(),
//         HOTEL_BOOKINGS_COLLECTION_NAME,
//         userBooking.booking_Id,
//         HOTEL_BOOKINGS_ROOMS_COLLECTION_NAME,
//       );
//       const roomRef = await addDoc(roomCollectionRef, {
//         room_Id: userBooking.roomsList[i].room_Id,
//         room_Name: userBooking.roomsList[i].room_Name,
//         room_Info: userBooking.roomsList[i].room_Info,
//         room_Image_Url: userBooking.roomsList[i].room_Image_Url,
//         plan_Id: userBooking.roomsList[i].plan_Id,
//         plan_Name: userBooking.roomsList[i].plan_Name,
//         plan_Info: userBooking.roomsList[i].plan_Info,
//         room_Guest_Occupancy: userBooking.roomsList[i].room_Guest_Occupancy,
//         room_Children_Occupancy:
//           userBooking.roomsList[i].room_Children_Occupancy,

//         plan_End_Date: new Date(userBooking.roomsList[i].plan_End_Date),
//         plan_Start_Date: new Date(userBooking.roomsList[i].plan_Start_Date),

//         room_Count: userBooking.roomsList[i].room_Count,
//         num_Guests: userBooking.roomsList[i].num_Guests,
//         num_Children: userBooking.roomsList[i].num_Children,

//         plan_Child_Price: userBooking.roomsList[i].plan_Child_Price,
//         plan_Room_Price: userBooking.roomsList[i].plan_Room_Price,
//         plan_Tax: userBooking.roomsList[i].plan_Tax,
//         plan_Price: userBooking.roomsList[i].plan_Price,
//         priceBreakUp: userBooking.roomsList[i].priceBreakUp,
//         room_Children_Age_Price_Info:
//           userBooking.roomsList[i].room_Children_Age_Price_Info,

//         total_Room_Plan_Price: userBooking.roomsList[i].total_Room_Plan_Price,
//         total_Plan_Tax: userBooking.roomsList[i].total_Plan_Tax,
//         total_Plan_Price: userBooking.roomsList[i].total_Plan_Price,
//       });
//     }

//     return { status: true, data: response };
//   } catch (error) {
//     console.log("hotel payment info Creation: ", error);
//     return {
//       status: false,
//       data: null,
//       id: generateUniqueId(),
//     };
//   }
// };

export const tourPaymentInfoCreation = async (
  tourBooking: TourBookingDetails,
) => {
  try {
    if (tourBooking.tour_Start_Date.includes("GMT+")) {
      const startDate = new Date(tourBooking.tour_Start_Date);
      startDate.setHours(startDate.getHours() + 8);
      startDate.setMinutes(startDate.getMinutes() + 30);
      tourBooking.tour_Start_Date = startDate.toISOString();
    }

    const docBookingRef = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
      PAYMENT_INFO_COLLECTION_NAME,
      tourBooking.booking_Id,
    );

    const response = await setDoc(docBookingRef, {
      ...tourBooking,
      booking_Time: new Date(),
      tour_Start_Date: new Date(tourBooking.tour_Start_Date),
      booking_Confirmation_Url: `https://${WEBSITE_BASE_URL}/bookingInformation/things-to-do/${tourBooking.booking_Id}?booking_status=${`Booking Successful`}&tour_Id=${tourBooking.tour_Slug_Name}&tour_Name=${tourBooking.tour_Name}&user_Name=${tourBooking.user_Name}&user_Email=${tourBooking.user_Email_Id}&user_Phone=${tourBooking.user_Phone_Number}&booking_receipt=${tourBooking.receipt_Id}`,
      booking_Redirect_Url: `/bookingInformation/things-to-do/${tourBooking.booking_Id}?booking_status=${`Booking Successful`}&tour_Id=${tourBooking.tour_Slug_Name}&tour_Name=${tourBooking.tour_Name}&user_Name=${tourBooking.user_Name}&user_Email=${tourBooking.user_Email_Id}&user_Phone=${tourBooking.user_Phone_Number}&booking_receipt=${tourBooking.receipt_Id}`,
    });

    const planCol = collection(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
      PAYMENT_INFO_COLLECTION_NAME,
      tourBooking.booking_Id,
      TOUR_PLANS_BOOKING_COLLECTION_NAME,
    );

    for (let pInfo of tourBooking.plans_List) {
      await addDoc(planCol, {
        ...pInfo,
      });
    }

    return {
      status: true,
      data: response,
    };
  } catch (error) {
    return {
      status: false,
      data: null,
    };
  }
};

// export const activitiesPaymentInfoCreation = async (activitiesBooking: any) => {
//   try {
//     if (activitiesBooking.activity_Start_Date.includes("GMT+")) {
//       const startDate = new Date(activitiesBooking.activity_Start_Date);
//       startDate.setHours(startDate.getHours() + 8);
//       startDate.setMinutes(startDate.getMinutes() + 30);
//       activitiesBooking.activity_Start_Date = startDate.toISOString();
//     }

//     const docBookingRef = doc(
//       db,
//       STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
//       STAYBOOK_ACTIVITY_BOOKINGS_SECTION_NAME,
//       PAYMENT_INFO_COLLECTION_NAME,
//       activitiesBooking.booking_Id,
//     );

//     const response = await setDoc(docBookingRef, {
//       ...activitiesBooking,
//       booking_Confirmation_Data: activitiesBooking.booking_Confirmation_Data,
//       booking_Time: new Date(),
//       activity_Start_Date: new Date(activitiesBooking.activity_Start_Date),
//       booking_Confirmation_Url: `https://${WEBSITE_BASE_URL}/bookingInformation/activities/${activitiesBooking.booking_Id}?booking_status=${`Booking Successful`}&activity_Id=${activitiesBooking.activity_Slug_Name}&activity_Name=${activitiesBooking.activity_Name}&user_Name=${activitiesBooking.user_Name}&user_Email=${activitiesBooking.user_Email_Id}&user_Phone=${activitiesBooking.user_Phone_Number}&booking_receipt=${activitiesBooking.receipt_Id}`,
//       booking_Redirect_Url: `/bookingInformation/activities/${activitiesBooking.booking_Id}?booking_status=${`Booking Successful`}&activity_Id=${activitiesBooking.activity_Slug_Name}&activity_Name=${activitiesBooking.activity_Name}&user_Name=${activitiesBooking.user_Name}&user_Email=${activitiesBooking.user_Email_Id}&user_Phone=${activitiesBooking.user_Phone_Number}&booking_receipt=${activitiesBooking.receipt_Id}`,
//     });

//     const planCol = collection(
//       db,
//       STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
//       STAYBOOK_ACTIVITY_BOOKINGS_SECTION_NAME,
//       PAYMENT_INFO_COLLECTION_NAME,
//       activitiesBooking.booking_Id,
//       ACTIVITY_PLANS_BOOKING_COLLECTION_NAME,
//     );

//     for (let pInfo of activitiesBooking.plans_List) {
//       await addDoc(planCol, {
//         ...pInfo,
//       });
//     }

//     return {
//       status: true,
//       data: response,
//     };
//   } catch (error) {
//     return {
//       status: false,
//       data: null,
//     };
//   }
// };
