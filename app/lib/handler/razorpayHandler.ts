// import { BookingDetails } from "@/lib/classModels/bookings/bookingDetails";
// import { bookingConfirmationRedirector } from "../firebase/bookingHandler";
// import { payAtHotelApiBookingHandler } from "./hotelBookingApiHandler";
import {
  // routerToActivitiesConfirmationPage,
  routerToTourConfirmationPage,
} from "./pageHandler";
// import { TourBookingDetails } from "../classModels/bookings/tourBookingDetails";
// import { VisaInqueryDetails } from "../classModels/bookings/visaInqueryDetails";
// import { ActivityBookingDetails } from "../classModels/bookings/activityBookingDetails";
// import {  encryptData } from "@/src/utils";
// import { BookingDetails } from "@/app/classes/bookings/bookingDetails";
// import { bookingConfirmationRedirector } from "../firebase/bookingHandler";
import { encryptData } from "../utils/dataEncryption/dataEncryption";
import { TourBookingDetails } from "@/app/classes/bookings/tourBookingDetails";
declare var window: any;

export const authenticateRazorpayBookingViaOrderId = async (
  orderId: string,
  payingAmount: number,
) => {
  const response = await fetch("/api/razorpay/razorpayOrderIdStatusCheck", {
    method: "POST",
    body: JSON.stringify({
      cipherRequest: encryptData({
        orderId,
        payingAmount,
      }),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const paymentSignatureConfirmation = async (
  razorpayPaymentResponse: any,
): Promise<boolean> => {
  const cipherRazorpayResponse = encryptData(razorpayPaymentResponse);
  const response = await fetch("/api/booking/razorpayPaymentSignature", {
    method: "POST",
    body: JSON.stringify({
      cipherResponse: cipherRazorpayResponse,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const data = await response.json();
    if (data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const makeRazorpayPaymentForTour = async (
  router: any,
  tourBookingInfo: TourBookingDetails,
  setErrorMessage: Function,
  setErrorModal: Function,
  setLoadingModal: Function,
) => {
  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
    setErrorMessage("Razorpay SDK Failed to load! Please try again.");
    setLoadingModal(false);
    setErrorModal(true);
    return;
  }

  const cipherBookingInfo = encryptData(tourBookingInfo);
  // Make API call to the serverless API
  const data = await fetch("/api/razorpay/createOrder/createOrderTour", {
    method: "POST",
    body: JSON.stringify({
      cipherBookingInfo: cipherBookingInfo,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((t) => t.json());

  var options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    name: "StayBook",
    currency: data.currency,
    amount: data.amount,
    order_id: data.id,
    description: "Staybook Tour Booking",
    image: "/brand_logo.svg",
    handler: async function (response: {
      razorpay_payment_id: any;
      razorpay_order_id: any;
      razorpay_signature: any;
    }) {
      try {
        const orderId = response.razorpay_order_id;
        tourBookingInfo.booking_Id = orderId;
        routerToTourConfirmationPage(router, tourBookingInfo);
      } catch (error) {
        setErrorMessage("Booking Failed! Please try again.");
        setLoadingModal(false);
        setErrorModal(true);
      }
    },
    prefill: {
      name: tourBookingInfo.user_Name,
      email: tourBookingInfo.user_Email_Id,
      contact: tourBookingInfo.user_Phone_Number,
    },
    notes: {
      address: tourBookingInfo.user_Address,
    },
    theme: {
      color: "#005250",
    },
    modal: {
      ondismiss: function () {
        setErrorMessage("Payment was cancelled by the user.");
        setLoadingModal(false);
        setErrorModal(true);
      },
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  return;
};


// export const makeRazorpayPaymentForVisa = async (
//   visaBookingInfo: VisaInqueryDetails,
//   setErrorMessage: Function,
//   setErrorModal: Function,
//   setLoadingModal: Function,
//   setSuccessModal: Function,
//   resetState: Function,
// ) => {
//   const res = await initializeRazorpay();

//   if (!res) {
//     alert("Razorpay SDK Failed to load");
//     setErrorMessage("Razorpay SDK Failed to load! Please try again.");
//     setLoadingModal(false);
//     setErrorModal(true);
//     return;
//   }

//   setLoadingModal(true);
//   const cipherQueryInfo = encryptData(visaBookingInfo);

//   const data = await fetch("/api/razorpay/createOrder/createOrderVisa", {
//     method: "POST",
//     body: JSON.stringify({
//       cipherQueryInfo: cipherQueryInfo,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((t) => t.json());
//   const paymentId = data.id;
//   visaBookingInfo.visa_Request_Id = data.id;

//   try {
//     var options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//       name: "StayBook",
//       currency: data.currency,
//       amount: data.amount,
//       order_id: data.id,
//       description: "Staybook Visa Query",
//       image: "/brand_logo.svg",
//       handler: async function (response: {
//         razorpay_payment_id: any;
//         razorpay_order_id: any;
//         razorpay_signature: any;
//       }) {
//         setSuccessModal(true);
//         resetState();
//       },
//       prefill: {
//         name:
//           visaBookingInfo.visa_User_First_Name +
//           " " +
//           visaBookingInfo.visa_User_Last_Name,
//         email: visaBookingInfo.visa_User_Email_Id,
//         contact: visaBookingInfo.visa_User_Contact_Number,
//       },
//       theme: {
//         color: "#005250",
//       },
//       modal: {
//         ondismiss: function () {
//           resetState();
//           setErrorMessage("Payment was cancelled by the user.");
//           setLoadingModal(false);
//           setErrorModal(true);
//         },
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//     return;
//   } catch (error) {
//     setErrorMessage("Invalid booking Id! Please try again.");
//     setLoadingModal(false);
//     setErrorModal(true);
//   }
// };

// export const makeRazorpayPaymentForActivity = async (
//   router: any,
//   activityBookingInfo: ActivityBookingDetails,
//   setErrorMessage: Function,
//   setErrorModal: Function,
//   setLoadingModal: Function,
// ) => {
//   const res = await initializeRazorpay();

//   if (!res) {
//     alert("Razorpay SDK Failed to load");
//     setErrorMessage("Razorpay SDK Failed to load! Please try again.");
//     setLoadingModal(false);
//     setErrorModal(true);
//     return;
//   }

//   const cipherBookingInfo = encryptData(activityBookingInfo);
//   const response = await fetch("/api/razorpay/createOrder/createOrderActivity", {
//     method: "POST",
//     body: JSON.stringify({
//       cipherBookingInfo: cipherBookingInfo,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await response.json();

//   // Check if Headout booking failed and redirect if necessary
//   if (!response.ok || data.success === false || data.headoutBookingSuccess === false) {
//     console.log("Headout booking failed, redirecting to activity page");
//     console.log("Error details:", data.message || data.error);
    
//     // Show error message to user
//     alert(data.message || "Booking failed. Please try again.");
    
//     removeKeyFromLocalStorage("ainfo");
    
//     // Use redirectTo from API response if available, otherwise fallback
//     const redirectPath = data.redirectTo || `/activities/${activityBookingInfo.activity_Slug_Name}`;
//     router.push(redirectPath);
    
//     setLoadingModal(false);
//     return;
//   }

//   var options = {
//     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//     name: "StayBook",
//     currency: data.currency,
//     amount: data.amount,
//     order_id: data.id,
//     description: "Staybook Activity Booking",
//     image: "/brand_logo.svg",
//     handler: async function (response: {
//       razorpay_payment_id: any;
//       razorpay_order_id: any;
//       razorpay_signature: any;
//     }) {
//       try {
//         const orderId = response.razorpay_order_id;
//         activityBookingInfo.booking_Id = orderId;
//         routerToActivitiesConfirmationPage(router, activityBookingInfo);
//       } catch (error) {
//         setErrorMessage("Booking Failed! Please try again.");
//         setLoadingModal(false);
//         setErrorModal(true);
//       }
//     },
//     prefill: {
//       name: activityBookingInfo.user_Name,
//       email: activityBookingInfo.user_Email_Id,
//       contact: activityBookingInfo.user_Phone_Number,
//     },
//     notes: {
//       address: activityBookingInfo.user_Address,
//     },
//     theme: {
//       color: "#005250",
//     },
//     modal: {
//       ondismiss: function () {
//         setErrorMessage("Payment was cancelled by the user.");
//         setLoadingModal(false);
//         setErrorModal(true);
//       },
//     },
//   };

//   const paymentObject = new window.Razorpay(options);
//   paymentObject.open();
//   return;
// };

// export const makeRazorpayPayment = async (
//   router: any,
//   userBooking: BookingDetails,
//   setErrorMessage: Function,
//   setErrorModal: Function,
//   setLoadingModal: Function,
// ) => {
//   const res = await initializeRazorpay();
//   if (!res) {
//     alert("Razorpay SDK Failed to load");
//     setErrorMessage("Razorpay SDK Failed to load! Please try again.");
//     setLoadingModal(false);
//     setErrorModal(true);
//     return;
//   }

//   setLoadingModal(true);
//   const cipherBookingInfo = encryptData(userBooking);
//   // Make API call to the serverless API
//   const data = await fetch("/api/razorpay/createOrder/createOrderHotel", {
//     method: "POST",
//     body: JSON.stringify({
//       cipherBookingInfo: cipherBookingInfo,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((t) => t.json());
//   const paymentId = data.id;
//   userBooking.booking_Id = data.id;

//   try {
//     var options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//       name: "StayBook",
//       currency: data.currency,
//       amount: data.amount,
//       order_id: data.id,
//       description: "Staybook Hotel Booking",
//       image: "/brand_logo.svg",
//       handler: async function (response: {
//         razorpay_payment_id: any;
//         razorpay_order_id: any;
//         razorpay_signature: any;
//       }) {
//         try {
//           bookingConfirmationRedirector(
//             router,
//             userBooking.booking_Id,
//             userBooking.receipt_Id,
//             userBooking,
//           );
//         } catch (error: any) {
//           userBooking.amount_Paid = userBooking.paying_Amount;
//           userBooking.payment_Made = true;
//           userBooking.payment_Gateway = "razorpay";
//           setLoadingModal(true);

//           const bookingRes = await payAtHotelApiBookingHandler(userBooking);

//           if (bookingRes.status) {
//             userBooking.booking_Id = bookingRes.booking_Id;
//             userBooking.receipt_Id = bookingRes.receipt_Id;
//             bookingConfirmationRedirector(
//               router,
//               bookingRes.booking_Id,
//               bookingRes.receipt_Id,
//               userBooking,
//             );
//           } else {
//             setErrorMessage("Invalid booking Id! Please try again.");
//             setLoadingModal(false);
//             setErrorModal(true);
//           }
//         }
//       },
//       prefill: {
//         name: userBooking.user_Name,
//         email: userBooking.user_Email_Id,
//         contact: userBooking.user_Phone_Number,
//       },
//       notes: {
//         address: userBooking.user_Address,
//       },
//       theme: {
//         color: "#005250",
//       },
//       modal: {
//         ondismiss: function () {
//           setErrorMessage("Payment was cancelled by the user.");
//           setLoadingModal(false);
//           setErrorModal(true);
//         },
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//     return;
//   } catch (error) {
//     setErrorModal(false);
//     setLoadingModal(true);
//     const razorpayRes = await authenticateRazorpayBookingViaOrderId(
//       paymentId,
//       userBooking.paying_Amount,
//     );

//     if (razorpayRes.status || true) {
//       userBooking.amount_Paid = userBooking.paying_Amount;
//       userBooking.payment_Made = true;
//       userBooking.payment_Gateway = "razorpay";
//       userBooking.payment_Testing_Info =
//         "authenticateRazorpayBookingViaOrderId";
//       setLoadingModal(true);
//       const bookingRes = await payAtHotelApiBookingHandler(userBooking);

//       if (bookingRes.status) {
//         userBooking.booking_Id = bookingRes.booking_Id;
//         userBooking.receipt_Id = bookingRes.receipt_Id;
//         bookingConfirmationRedirector(
//           router,
//           bookingRes.booking_Id,
//           bookingRes.receipt_Id,
//           userBooking,
//         );
//       } else {
//         setErrorMessage("Invalid booking Id! Please try again.");
//         setLoadingModal(false);
//         setErrorModal(true);
//       }
//     } else {
//       setErrorMessage("Invalid booking Id! Please try again.");
//       setLoadingModal(false);
//       setErrorModal(true);
//     }
//   }
// };
