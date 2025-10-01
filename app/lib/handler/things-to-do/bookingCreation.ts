import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import {
  TOUR_AND_TRAVEL_COLLECTION_NAME,
  TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
  TOUR_AND_TRAVELS_BOOKING_INFORMATION_SUBCOLLECTION_NAME,
  WEBSITE_BASE_URL,
  USER_BOOKINGS_COLLECTION_NAME,
  TOUR_BOOKING_COLLECTION_NAME,
  STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
  STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
  TRAVEL_BOOKING_INFORMATION_SUBCOLLECTION_NAME,
  TOUR_PLANS_BOOKING_COLLECTION_NAME,
  TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
  PAYMENT_INFO_COLLECTION_NAME,
} from "../../helper";





import { db } from "../../firebase";
import { mailTransporter, senderEmail } from "@/app/api/utils/nodemailerService";
import { priceCurrencyConvertor } from "../../utils/priceCurrencyConvertor/priceCurrencyConvertor";
import { convertTo12HourFormat } from "../../utils/convertTo12HourFormat/convertTo12HourFormat";
import { TourBookingDetails } from "@/app/classes/bookings/tourBookingDetails";
import { PlanDetails } from "@/app/classes/bookings/planDetails";
import { formatTimestampToDate } from "../../utils/formatTimestampToDate/formatTimestampToDate";
import { formatUTCToIST } from "../../utils/formatUTCToIST/formatUTCToIST";
import { formatSecondToDaysNights } from "../../utils/formatSecondToDaysNights/formatSecondToDaysNights";

// store in order to get the accurate time of current date
function getCurentDate() {
  return new Date();
}

// Tour booking creation for user
export const userTourBookingCreation = async (
  bookingData: TourBookingDetails,
) => {
  try {
    const userRef = doc(
      db,
      USER_BOOKINGS_COLLECTION_NAME,
      bookingData.user_Email_Id,
      TOUR_BOOKING_COLLECTION_NAME,
      bookingData.booking_Id,
    );

    const userBookingRef = await setDoc(userRef, {
      booking_Type: bookingData.booking_Type,
      booking_Confirmation: true,

      tour_Name: bookingData.tour_Name,
      tour_Slug_Name: bookingData.tour_Slug_Name,
      tour_Image_Url: bookingData.tour_Image_Url,
      tour_Info: bookingData.tour_Info,
      tour_Rating: bookingData.tour_Rating,
      tour_City_Covered: bookingData.tour_City_Covered,
      // tour_Operator_Email_Id: bookingData.tour_Operator_Email_Id,
      // tour_Operator_Phone_Number: bookingData.tour_Operator_Phone_Number,
      tour_Operator_Email_Id: "staybookhost@gmail.com",
      tour_Operator_Phone_Number: "+918527703312",
      tour_Pickup_Address: bookingData.tour_Pickup_Address,

      booking_Confirmation_Url: `https://${WEBSITE_BASE_URL}/bookingInformation/things-to-do/${bookingData.booking_Id}?booking_status=${`Booking Successful`}&tour_Id=${bookingData.tour_Slug_Name}&tour_Name=${bookingData.tour_Name}&user_Name=${bookingData.user_Name}&user_Email=${bookingData.user_Email_Id}&user_Phone=${bookingData.user_Phone_Number}&booking_receipt=${bookingData.receipt_Id}`,
      booking_Redirect_Url: `/bookingInformation/things-to-do/${bookingData.booking_Id}?booking_status=${`Booking Successful`}&tour_Id=${bookingData.tour_Slug_Name}&tour_Name=${bookingData.tour_Name}&user_Name=${bookingData.user_Name}&user_Email=${bookingData.user_Email_Id}&user_Phone=${bookingData.user_Phone_Number}&booking_receipt=${bookingData.receipt_Id}`,

      booking_Time: getCurentDate(),
      tour_Start_Date: bookingData.tour_Start_Date,
      tour_Duration: bookingData.tour_Duration,
      tour_Days: bookingData.tour_Days,
      tour_Nights: bookingData.tour_Nights,
      total_Tour_Cost: bookingData.total_Tour_Cost,
      total_Tax: bookingData.total_Tax,
      total_Price: bookingData.total_Price,

      tour_General_Policy: bookingData.tour_General_Policy,
      tour_Cancellation_Policy: bookingData.tour_Cancellation_Policy,
      tour_Refund_Policy: bookingData.tour_Refund_Policy,

      payment_Gateway: bookingData.payment_Gateway,
      payment_Type: bookingData.payment_Type,
      booking_Created_From: bookingData.booking_Created_From,

      tour_Handling_Charges: bookingData.tour_Handling_Charges,
      user_Name: bookingData.user_Name,
      user_First_Name: bookingData.user_First_Name,
      user_Last_Name: bookingData.user_Last_Name,
      user_Email_Id: bookingData.user_Email_Id,
      user_Phone_Number: bookingData.user_Phone_Number,
      user_Instructions: bookingData.user_Instructions,
      user_Address: bookingData.user_Address,
      user_Pincode: bookingData.user_Pincode,
      user_City: bookingData.user_City,
      user_State: bookingData.user_State,
      user_Country: bookingData.user_Country,

      booking_Id: bookingData.booking_Id,
      user_Unique_Id: bookingData.user_Unique_Id,
      user_Staybook_Coins: bookingData.user_Staybook_Coins,

      total_Adult_Count: bookingData.total_Adult_Count,
      total_Child_Count: bookingData.total_Child_Count,
      total_Guest_Count: bookingData.total_Guest_Count,
      total_Plans_Count: bookingData.total_Plans_Count,

      payment_Made: bookingData.payment_Made,
      paying_Amount: bookingData.paying_Amount,
      amount_Paid: bookingData.amount_Paid,
      // booking_Confirmation_Url: bookingData.booking_Confirmation_Url,
      // booking_Redirect_Url: bookingData.booking_Redirect_Url,

      payment_Method_Type: bookingData.payment_Method_Type,
      payment_Testing_Info: bookingData.payment_Testing_Info,
      razorpay_Payment_Id: bookingData.razorpay_Payment_Id,
      razorpay_Order_Id: bookingData.razorpay_Order_Id,
      razorpay_Signature_Id: bookingData.razorpay_Signature_Id,
      recreceipt_Id: bookingData.receipt_Id,

      booking_Cancelled_Status: bookingData.booking_Cancelled_Status,
      booking_Checkin_Status: bookingData.booking_Checkin_Status,
      booking_Coins: bookingData.booking_Coins,
      booking_Noshow_Status: bookingData.booking_Noshow_Status,
      booking_Status: bookingData.booking_Status,

      tour_Currency_Code: bookingData.tour_Currency_Code,
      tour_Currency_Symbol: bookingData.tour_Currency_Symbol,
      tour_Currency_Value: bookingData.tour_Currency_Value,

      tour_Type: bookingData.tour_Type,
      visitor_Details: bookingData.visitor_Details,
    });

    const bookingPlanCol = collection(
      db,
      USER_BOOKINGS_COLLECTION_NAME,
      bookingData.user_Email_Id,
      TOUR_BOOKING_COLLECTION_NAME,
      bookingData.booking_Id,
      TOUR_PLANS_BOOKING_COLLECTION_NAME,
    );

    for (let planInfo of bookingData.plans_List) {
      await addDoc(bookingPlanCol, {
        ...planInfo,
      });
    }

    return {
      status: true,
    };
  } catch (error: any) {
    console.log("Error in userTourBookingCreation: ", error?.message || error);
    return {
      status: false,
    };
  }
};

// Tour booking creation for tour operator
export const operatorTourBookingCreation = async (
  bookingData: TourBookingDetails,
) => {
  try {
    const operatorRef = doc(
      db,
      TOUR_AND_TRAVEL_COLLECTION_NAME,
      TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
      TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
      bookingData.tour_Slug_Name,
      TOUR_AND_TRAVELS_BOOKING_INFORMATION_SUBCOLLECTION_NAME,
      bookingData.booking_Id,
    );

    // if (bookingData.tour_Start_Date.toString().includes("GMT+")) {
    //   const checkinDate = new Date(bookingData.tour_Start_Date.toString());
    //   checkinDate.setHours(checkinDate.getHours() + 8);
    //   checkinDate.setMinutes(checkinDate.getMinutes() + 30);
    //   bookingData.tour_Start_Date = checkinDate.toISOString();
    // }

    const operatorBookingRef = await setDoc(operatorRef, {
      booking_Type: bookingData.booking_Type,
      booking_Confirmation: true,

      tour_Name: bookingData.tour_Name,
      tour_Slug_Name: bookingData.tour_Slug_Name,
      tour_Image_Url: bookingData.tour_Image_Url,
      tour_Info: bookingData.tour_Info,
      tour_Rating: bookingData.tour_Rating,
      tour_City_Covered: bookingData.tour_City_Covered,
      // tour_Operator_Email_Id: bookingData.tour_Operator_Email_Id,
      // tour_Operator_Phone_Number: bookingData.tour_Operator_Phone_Number,
      tour_Operator_Email_Id: "staybookhost@gmail.com",
      tour_Operator_Phone_Number: "+918527703312",
      tour_Pickup_Address: bookingData.tour_Pickup_Address,

      booking_Time: getCurentDate(),
      tour_Start_Date: bookingData.tour_Start_Date,
      tour_Duration: bookingData.tour_Duration,
      tour_Days: bookingData.tour_Days,
      tour_Nights: bookingData.tour_Nights,
      total_Tour_Cost: bookingData.total_Tour_Cost,
      total_Tax: bookingData.total_Tax,
      total_Price: bookingData.total_Price,
      booking_Confirmation_Url: `https://${WEBSITE_BASE_URL}/bookingInformation/things-to-do/${bookingData.booking_Id}?booking_status=${`Booking Successful`}&tour_Id=${bookingData.tour_Slug_Name}&tour_Name=${bookingData.tour_Name}&user_Name=${bookingData.user_Name}&user_Email=${bookingData.user_Email_Id}&user_Phone=${bookingData.user_Phone_Number}&booking_receipt=${bookingData.receipt_Id}`,
      booking_Redirect_Url: `/bookingInformation/things-to-do/${bookingData.booking_Id}?booking_status=${`Booking Successful`}&tour_Id=${bookingData.tour_Slug_Name}&tour_Name=${bookingData.tour_Name}&user_Name=${bookingData.user_Name}&user_Email=${bookingData.user_Email_Id}&user_Phone=${bookingData.user_Phone_Number}&booking_receipt=${bookingData.receipt_Id}`,

      tour_General_Policy: bookingData.tour_General_Policy,
      tour_Cancellation_Policy: bookingData.tour_Cancellation_Policy,
      tour_Refund_Policy: bookingData.tour_Refund_Policy,

      payment_Gateway: bookingData.payment_Gateway,
      payment_Type: bookingData.payment_Type,
      booking_Created_From: bookingData.booking_Created_From,

      tour_Handling_Charges: bookingData.tour_Handling_Charges,
      user_Name: bookingData.user_Name,
      user_First_Name: bookingData.user_First_Name,
      user_Last_Name: bookingData.user_Last_Name,
      user_Email_Id: bookingData.user_Email_Id,
      user_Phone_Number: bookingData.user_Phone_Number,
      user_Instructions: bookingData.user_Instructions,
      user_Address: bookingData.user_Address,
      user_Pincode: bookingData.user_Pincode,
      user_City: bookingData.user_City,
      user_State: bookingData.user_State,
      user_Country: bookingData.user_Country,

      booking_Id: bookingData.booking_Id,
      user_Unique_Id: bookingData.user_Unique_Id,
      user_Staybook_Coins: bookingData.user_Staybook_Coins,

      total_Adult_Count: bookingData.total_Adult_Count,
      total_Child_Count: bookingData.total_Child_Count,
      total_Guest_Count: bookingData.total_Guest_Count,
      total_Plans_Count: bookingData.total_Plans_Count,

      payment_Made: bookingData.payment_Made,
      paying_Amount: bookingData.paying_Amount,
      amount_Paid: bookingData.amount_Paid,
      // booking_Confirmation_Url: bookingData.booking_Confirmation_Url,
      // booking_Redirect_Url: bookingData.booking_Redirect_Url,

      payment_Method_Type: bookingData.payment_Method_Type,
      payment_Testing_Info: bookingData.payment_Testing_Info,
      razorpay_Payment_Id: bookingData.razorpay_Payment_Id,
      razorpay_Order_Id: bookingData.razorpay_Order_Id,
      razorpay_Signature_Id: bookingData.razorpay_Signature_Id,
      recreceipt_Id: bookingData.receipt_Id,

      booking_Cancelled_Status: bookingData.booking_Cancelled_Status,
      booking_Checkin_Status: bookingData.booking_Checkin_Status,
      booking_Coins: bookingData.booking_Coins,
      booking_Noshow_Status: bookingData.booking_Noshow_Status,
      booking_Status: bookingData.booking_Status,

      tour_Currency_Code: bookingData.tour_Currency_Code,
      tour_Currency_Symbol: bookingData.tour_Currency_Symbol,
      tour_Currency_Value: bookingData.tour_Currency_Value,

      tour_Type: bookingData.tour_Type,
      visitor_Details: bookingData.visitor_Details,
    });

    const bookingPlanCol = collection(
      db,
      TOUR_AND_TRAVEL_COLLECTION_NAME,
      TOUR_AND_TRAVELS_INFORMATION_INDIA_DOCUMENT,
      TOUR_AND_TRAVEL_SUB_COLLECTION_NAME,
      bookingData.tour_Slug_Name,
      TOUR_AND_TRAVELS_BOOKING_INFORMATION_SUBCOLLECTION_NAME,
      bookingData.booking_Id,
      TOUR_PLANS_BOOKING_COLLECTION_NAME,
    );

    for (let planInfo of bookingData.plans_List) {
      await addDoc(bookingPlanCol, {
        ...planInfo,
      });
    }

    return {
      status: true,
    };
  } catch (error: any) {
    console.log(
      "Error in operatorTourBookingCreation: ",
      error?.message || error,
    );
    return {
      status: false,
    };
  }
};

// Tour booking creation for staybook
export const staybookTourBookingCreation = async (
  bookingData: TourBookingDetails,
) => {
  try {
    const bookingDoc = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
      TRAVEL_BOOKING_INFORMATION_SUBCOLLECTION_NAME,
      bookingData.booking_Id,
    );

    const response = await setDoc(bookingDoc, {
      booking_Id: bookingData.booking_Id,
      booking_Time: getCurentDate(),
      tour_Name: bookingData.tour_Name,
      tour_Slug_Name: bookingData.tour_Slug_Name,
      tour_Image_Url: bookingData.tour_Image_Url,
      // tour_Operator_Email_Id: bookingData.tour_Operator_Email_Id,
      // tour_Operator_Phone_Number: bookingData.tour_Operator_Phone_Number,
      tour_Operator_Email_Id: "staybookhost@gmail.com",
      tour_Operator_Phone_Number: "+918527703312",
      tour_Pickup_Address: bookingData.tour_Pickup_Address,
      tour_Start_Date: bookingData.tour_Start_Date,
      tour_Duration: bookingData.tour_Duration,
      tour_Days: bookingData.tour_Days,
      tour_Nights: bookingData.tour_Nights,
      total_Tour_Cost: bookingData.total_Tour_Cost,
      total_Tax: bookingData.total_Tax,
      total_Price: bookingData.total_Price,

      tour_Currency_Code: bookingData.tour_Currency_Code,
      tour_Currency_Symbol: bookingData.tour_Currency_Symbol,
      tour_Currency_Value: bookingData.tour_Currency_Value,

      tour_Type: bookingData.tour_Type,
      visitor_Details: bookingData.visitor_Details,
    });

    return {
      status: true,
    };
  } catch (error: any) {
    console.log(
      "Error in staybookTourBookingCreation: ",
      error?.message || error,
    );
    return {
      status: false,
    };
  }
};

const generateCityCoveredHTML = (cities : any) => {
  if (!Array.isArray(cities)) return ""; // Return empty string if input isn’t an array

  return cities
    .map((city) => {
      return `
        <td
          style="
            display: inline-block;
            background-color: #005250;
            color: #fff;
            padding: 6px 16px;
            border-radius: 999px;
            font-size: 14px;
            margin-right: 8px;
          "
        >
          ${city}
        </td>
      `;
    })
    .join("");
};

function getTourOptions(planList: PlanDetails[], tourType: string) {
  if (!planList || !Array.isArray(planList) || planList.length === 0) return "";

  const isTour = tourType === "Ticket-Only";

  return planList
    .map((option, index) => {
      // Handle Pickup Info
      const pickupInfo =
        isTour && option.plan_Pickup_Info.available
          ? `${convertTo12HourFormat(option.plan_Pickup_Info.time)}`
          : `Pickup From ${option.plan_Pickup_Info.location} at ${option.plan_Pickup_Info.time}`;

      // Handle Dropoff Info
      const dropoffInfo =
        isTour && option.plan_Dropoff_Info.available
          ? `${convertTo12HourFormat(option.plan_Dropoff_Info.time)}`
          : `Dropoff To ${option.plan_Dropoff_Info.location} at ${option.plan_Dropoff_Info.time}`;

      return `
          <tr>
            <td
              style="
                border-radius: 12px;
                padding: 16px;
                background-color: #ddd;
                margin: 8px 0 0 0;
              "
            >
              <h4 style="color: #333; margin: 0">${option.plan_Title}</h4>
              <table width="100%">
                <tr>
                  <td>
                    <p style="margin: 0">
                      <small style="font-weight: normal">
                        Duration:
                      </small>
                    </p>
                    <p style="font-weight: bold; margin: 0">
                      ${option.plan_Days} Day${option.plan_Days > 1 ? "s" : ""} ${option.plan_Nights > 0 ? `, ${option.plan_Nights} Night${option.plan_Nights > 1 ? "s" : ""}` : ""}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin: 0">
                      <small style="font-weight: normal">
                        Group Size:
                      </small>
                    </p>
                    <p style="font-weight: bold; margin: 0">
                      ${option.total_Adult_Count} Adult${option.total_Adult_Count > 1 ? "s" : ""} ${option.total_Child_Count > 0 ? `, ${option.total_Child_Count} Child${option.total_Child_Count > 1 ? "ren" : ""}` : ""}
                    </p>
                  </td>
                </tr>

                ${
                  isTour
                    ? `
                  <tr>
                    <td>
                      <p style="margin: 0">
                        <small style="font-weight: normal">
                          Visit Timing:
                        </small>
                      </p>
                      <p style="font-weight: bold; margin: 0">
                        ${pickupInfo}
                      </p>
                    </td>
                  </tr>
                  `
                    : `
                  <tr>
                    <td>
                      <p style="margin: 0">
                        <small style="font-weight: normal">
                          Pickup Location:
                        </small>
                      </p>
                      <p style="font-weight: bold; margin: 0">
                        ${pickupInfo}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 0">
                        <small style="font-weight: normal">
                          Dropoff Location:
                        </small>
                      </p>
                      <p style="font-weight: bold; margin: 0">
                        ${dropoffInfo}
                      </p>
                    </td>
                  </tr>
                  `
                }
              </table>
            </td>
          </tr>
        `;
    })
    .join("");
}

// send user confirmation mail
export const userTourBookingConfirmationMail = async (
  bookingData: TourBookingDetails,
) => {
  try {
    const tourCityCoveredData = generateCityCoveredHTML(
      bookingData.tour_City_Covered,
    );
    const tourOptions = getTourOptions(
      bookingData.plans_List,
      bookingData.tour_Type,
    );

    const currencyCode = bookingData.tour_Currency_Code;
    const currencySymbol =
      currencyCode === "INR" ? "₹" : bookingData.tour_Currency_Symbol;
    const currencyValue = bookingData.tour_Currency_Value;
    const totalAmount = `${currencySymbol}${Math.ceil(priceCurrencyConvertor(bookingData.total_Price, currencyValue))}`;
    const paidAmount = `${currencySymbol}${Math.ceil(priceCurrencyConvertor(bookingData.amount_Paid, currencyValue))}`;
    const leftToPayAmount = `${currencySymbol}${Math.ceil(priceCurrencyConvertor(bookingData.total_Price - bookingData.amount_Paid, currencyValue))}`;

    const policyPoints = bookingData.tour_Cancellation_Policy.split("<br/>");

    const response = await mailTransporter.sendMail({
      from: `Staybook ${senderEmail}`,
      to: bookingData.user_Email_Id,
      subject: `Trip Booking Successful! Here Are Your Trip Details - ${bookingData.booking_Id}`,
      text: `Your booking for ${bookingData.tour_Name} has been confirmed.`,
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Booking Confirmation</title>
            <style type="text/css">
              small {
                color: #777777;
              }
            </style>
          </head>
          <body
            style="
              margin: 0;
              padding: 0;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 14px;
              letter-spacing: 0.25px;
            "
          >
            <center style="width: 100%; table-layout: fixed; padding-bottom: 60px">
              <table
                width="100%"
                style="
                  margin: 0 auto;
                  padding: 16px 0 0 0;
                  border-spacing: 0;
                  width: 100%;
                  max-width: 600px;
                  color: #333;
                  background-color: #005250;
                "
              >
                <tr>
                  <td
                    style="
                      background-color: #005250;
                      color: #ffffff;
                      padding: 16px;
                      text-align: center;
                    "
                  >
                    <img
                      src="https://images.staybook.in/logo%20(1).png"
                      alt="brand_logo"
                      width="60"
                      height="60"
                    />
                    <h2 style="margin-top: 8px">Booking Successful!</h2>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table
                      width="100%"
                      bgcolor="#FFFFFF"
                      style="border-radius: 10px; overflow: hidden"
                    >
                      <tr>
                        <td>
                          <img
                            src="${bookingData.tour_Image_Url}"
                            alt="tou image url"
                            width="100%"
                            height="240px"
                            style="display: block; object-fit: cover"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px; text-align: left">
                          <h2 style="margin: 0; font-size: 22px; color: #333">
                            <a
                              href="https://staybook.in/things-to-do/${bookingData.tour_Slug_Name}?pid=${bookingData.plans_List[0].plan_Id}"
                              target="_blank"
                              style="color: inherit; text-decoration: none"
                            >
                              ${bookingData.tour_Name}
                            </a>
                          </h2>
                          ${
                            bookingData.tour_Rating > 0
                              ? `
                          <p style="margin: 0; color: #666; font-size: 14px">
                            ⭐ ${bookingData.tour_Rating}/5
                          </p>
                          `
                              : ``
                          }
                          <p style="margin: 0; color: #666">${bookingData.tour_Info}</p>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <h3 style="color: #333; margin: 0">
                            Destinations Covers
                          </h3>
                          <table>
                            <tr>
                              <td>${tourCityCoveredData}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${
                  bookingData.plans_List.length > 1
                    ? `
                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table
                      width="100%"
                      style="background-color: #ffffff; border-radius: 12px"
                    >
                      <tr>
                        <td style="padding: 16px">
                          <h3 style="margin: 0">Selected Plans</h3>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <table width="100%">
                            ${tourOptions}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `
                    : ``
                }

                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table
                      width="100%"
                      style="background-color: #ffffff; border-radius: 12px"
                    >
                      <tr>
                        <td style="padding: 16px">
                          <h3 style="margin: 0">Highlights</h3>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <table width="100%">
                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">Booking Id:</small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${
                                    bookingData.booking_Confirmation_Url !== ""
                                      ? `
                                  <a
                                    target="_blank"
                                    href="${bookingData.booking_Confirmation_Url}"
                                    style="color: inherit; text-decoration: none"
                                  >
                                    ${bookingData.booking_Id} (view confirmation)
                                  </a>
                                  `
                                      : bookingData.booking_Id
                                  }
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                  Tour Plan Name:</small>
                                </p>
                                ${
                                  bookingData.plans_List.length > 0
                                    ? bookingData.plans_List
                                        .map(
                                          (plan) =>
                                            `<p style="font-weight: bold; margin: 0">
                                      ${plan.plan_Title}
                                    </p>`,
                                        )
                                        .join("")
                                    : `<p style="font-weight: bold; margin: 0">
                                    ${bookingData.plans_List[0].plan_Title}
                                  </p>`
                                }
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal"
                                    >Tour Duration:</small
                                  >
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${formatSecondToDaysNights(bookingData.tour_Duration)}
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">Group Size:</small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${bookingData.total_Adult_Count} Adults ${
                                    bookingData.total_Child_Count > 0
                                      ? `${bookingData.total_Child_Count}`
                                      : ""
                                  }
                                </p>
                              </td>
                            </tr>

                            ${
                              bookingData.tour_Type === "Ticket-Only" ||
                              bookingData.tour_Type === "Activity"
                                ? `
                              <tr>
                                <td>
                                  <p style="margin: 0">
                                    <small style="font-weight: normal">
                                      Visiting Time:
                                    </small>
                                  </p>
                                  <p style="font-weight: bold; margin: 0">
                                  ${
                                    bookingData.plans_List.length > 0
                                      ? bookingData.plans_List
                                          .map(
                                            (plan) =>
                                              `<p style="font-weight: bold; margin: 0">
                                        ${convertTo12HourFormat(plan.plan_Pickup_Info.time)}
                                      </p>`,
                                          )
                                          .join("")
                                      : `<p style="font-weight: bold; margin: 0">
                                      ${convertTo12HourFormat(bookingData.plans_List[0].plan_Pickup_Info.time)}
                                    </p>`
                                  }
                                  </p>
                                </td>
                              </tr>
                            `
                                : `
                              <tr>
                                <td>
                                  <p style="margin: 0">
                                    <small style="font-weight: normal">
                                      Pickup Location:
                                    </small>
                                  </p>
                                  <p style="font-weight: bold; margin: 0">
                                    ${bookingData.tour_Pickup_Address}
                                  </p>
                                </td>
                              </tr>
                            `
                            }

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    Tour Start Date:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${formatUTCToIST(bookingData.tour_Start_Date)}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table style="background-color: #ffffff; border-radius: 12px">
                      <tr>
                        <td style="padding: 16px">
                          <h3 style="margin: 0">Guest Info</h3>
                          <p style="margin: 0">
                            We're thrilled to confirm your booking with Staybook! Get
                            ready for an unforgettable adventure. Here are the details
                            of your booking.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <table
                            width="100%"
                            bgcolor="#ddd"
                            style="border-radius: 12px; padding: 16px"
                          >
                            ${
                              bookingData.tour_Type === "Ticket-Only"
                                ? `
                              <tr>
                                <td>
                                  <p style="margin: 0">
                                    <small style="font-weight: normal">
                                      User Name:
                                    </small>
                                  </p>
                                  <p style="font-weight: bold; margin: 0">
                                    ${bookingData.visitor_Details
                                      .map(
                                        (visitor, index) => `${visitor.name}`,
                                      )
                                      .join(", ")}
                                  </p>
                                </td>
                              </tr>
                            `
                                : `
                              <tr>
                                <td>
                                  <p style="margin: 0">
                                    <small style="font-weight: normal">
                                      User Name:
                                    </small>
                                  </p>
                                  <p style="font-weight: bold; margin: 0">
                                    ${bookingData.user_Name}
                                  </p>
                                </td>
                              </tr>
                            `
                            }

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    User phone:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${bookingData.user_Phone_Number}
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    User Email:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${bookingData.user_Email_Id}
                                </p>
                              </td>
                            </tr>

                            ${
                              bookingData.tour_Type === "Ticket-Only"
                                ? `
                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">User Id:</small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${bookingData.visitor_Details
                                    .filter(
                                      (visitor) =>
                                        visitor.idType && visitor.idNumber,
                                    )
                                    .map(
                                      (visitor) =>
                                        `${visitor.idType} - ${visitor.idNumber}`,
                                    )
                                    .join(", ")}
                                </p>
                              </td>
                            </tr>
                            `
                                : ``
                            } ${
                              bookingData.user_Instructions
                                ? `
                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    User Request:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${bookingData.user_Instructions}
                                </p>
                              </td>
                            </tr>
                            `
                                : ``
                            }
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table
                      width="100%"
                      style="background-color: #ffffff; border-radius: 12px"
                    >
                      <tr>
                        <td style="padding: 16px">
                          <h3 style="margin: 0">Payment Summary</h3>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <table width="100%">
                            <tr>
                              <td width="60%">
                                <h4>Booking Time</h4>
                                <h4 style="margin-top: 7px">Payment Mode</h4>
                                <h4 style="margin-top: 7px">Total Amount</h4>
                                ${bookingData.amount_Paid > 0 ? ` <h4 style="margin-top: 7px">Paid Amount</h4>` : ``}
                                ${bookingData.amount_Paid > 0 ? `<h4 style="margin-top: 7px">Amount Left To Pay</h4>` : ``}
                              </td>
                              <td width="40%" style="text-align: right">
                                <h4 style="white-space: no-wrap">${formatUTCToIST(getCurentDate(), true)}</h4>
                                <h4 style="margin-top: 7px">${bookingData.payment_Type}</h4>
                                <h4 style="margin-top: 7px">${totalAmount}</h4>
                                ${bookingData.amount_Paid > 0 ? `<h4 style="margin-top: 7px">${paidAmount}</h4>` : ``}
                                ${bookingData.amount_Paid > 0 ? `<h4 style="margin-top: 7px">${leftToPayAmount}</h4>` : ``}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table
                      width="100%"
                      style="background-color: #ffffff; border-radius: 12px"
                    >
                      <tr>
                        <td style="padding: 16px">
                          <h3 style="margin: 0">Cencellation Policy</h3>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 16px 0 16px">
                          <p style="margin: 0">Please note our cancellation policy:</p>
                         <ul>
                            ${policyPoints
                              .map(
                                (point) =>
                                  `<li style="padding: 2px 0">${point}</li>`,
                              )
                              .join("")}
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table
                      width="100%"
                      style="background-color: #ffffff; border-radius: 12px"
                    >
                      <tr>
                        <td style="padding: 16px">
                          <h3 style="margin: 0">Need Help?</h3>
                          <p style="margin: 0">
                            Our friendly customer support team is here to assist you
                            with any questions or concerns you may have about your
                            booking.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <table width="100%">
                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">Phone No:</small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  <a
                                    href="tel:+918527703312"
                                    style="color: #000; text-decoration: none"
                                  >
                                    918527703312
                                  </a>
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    Email Address:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  <a
                                    href="mailto:staybookbooking@gmail.com"
                                    style="color: #000; text-decoration: none"
                                  >
                                    staybookbooking@gmail.com
                                  </a>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      color: #ffffff;
                      text-align: center;
                      border-top: 1px solid #dddddd;
                      padding: 16px;
                    "
                  >
                    <p style="margin: 0">
                      Thank you for choosing Staybook. We look forward to providing you
                      with an exceptional experience.
                    </p>
                  </td>
                </tr>
              </table>
            </center>
          </body>
        </html>`,
    });

    return {
      status: true,
      data: response,
      message: `booking confirmation sent to user - ${bookingData.user_Name}, ${bookingData.user_Email_Id}`,
      error: null,
    };
  } catch (error: any) {
    console.log(
      "Error in userTourBookingConfirmationMail:",
      error?.message || error,
    );
    return {
      status: false,
      data: {},
      message: "",
      error: error?.message || error,
    };
  }
};

// send tour guide the booking confirmation
export const tourGuideBookingConfirmationMail = async (
  bookingData: TourBookingDetails,
) => {
  try {
    const tourCityCoveredData = generateCityCoveredHTML(
      bookingData.tour_City_Covered,
    );
    // const tourOptions = getTourOptions(bookingData.plans_List);

    const currencyCode = bookingData.tour_Currency_Code;
    const currencySymbol =
      currencyCode === "INR" ? "₹" : bookingData.tour_Currency_Symbol;
    const currencyValue = bookingData.tour_Currency_Value;
    const totalAmount = `${currencySymbol}${Math.ceil(priceCurrencyConvertor(bookingData.total_Price, currencyValue))}`;
    const paidAmount = `${currencySymbol}${Math.ceil(priceCurrencyConvertor(bookingData.amount_Paid, currencyValue))}`;
    const leftToPayAmount = `${currencySymbol}${Math.ceil(priceCurrencyConvertor(bookingData.total_Price - bookingData.amount_Paid, currencyValue))}`;

    const response = await mailTransporter.sendMail({
      from: `Staybook ${senderEmail}`,
      to: `Staybook ${senderEmail}`,
      subject: `Trip Booking Alert: A Customer Has Booked Your Service - ${bookingData.booking_Id}`,
      text: `Your booking for ${bookingData.tour_Name} has been confirmed.`,
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Booking Confirmation</title>
            <style type="text/css">
              small {
                color: #777777;
              }
            </style>
          </head>
          <body
            style="
              margin: 0;
              padding: 0;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 14px;
              letter-spacing: 0.25px;
            "
          >
            <center style="width: 100%; table-layout: fixed; padding-bottom: 60px">
              <table
                width="100%"
                style="
                  margin: 0 auto;
                  padding: 16px 0 0 0;
                  border-spacing: 0;
                  width: 100%;
                  max-width: 600px;
                  color: #333;
                  background-color: #005250;
                "
              >
                <tr>
                  <td
                    style="
                      background-color: #005250;
                      color: #ffffff;
                      padding: 16px;
                      text-align: center;
                    "
                  >
                    <img
                      src="https://images.staybook.in/logo%20(1).png"
                      alt="brand_logo"
                      width="60"
                      height="60"
                    />
                    <h2 style="margin-top: 8px">Tour Booking Confirmation</h2>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table width="100%" bgcolor="#FFFFFF" style="border-radius: 12px">
                      <tr>
                        <td>
                          <img
                            src="${bookingData.tour_Image_Url}"
                            alt="tou image url"
                            width="100%"
                            height="240px"
                            style="display: block; object-fit: cover"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px; text-align: left">
                          <h2 style="margin: 0; font-size: 22px; color: #333">
                            <a
                              href="https://staybook.in/things-to-do/${bookingData.tour_Slug_Name}?pid=${bookingData.plans_List[0].plan_Id}"
                              target="_blank"
                              style="color: inherit; text-decoration: none"
                            >
                              ${bookingData.tour_Name}
                            </a>
                          </h2>
                          ${
                            bookingData.tour_Rating > 0
                              ? `
                          <p style="margin: 0; color: #666; font-size: 14px">
                            ⭐ ${bookingData.tour_Rating}/5
                          </p>
                          `
                              : ``
                          }
                          <p style="margin: 0; color: #666">${bookingData.tour_Info}</p>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <h3 style="color: #333; margin: 0">
                            Destinations Covers
                          </h3>
                          <table>
                            <tr>
                              <td>${tourCityCoveredData}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 16px">
                    <table style="background-color: #ffffff; border-radius: 12px">
                      <tr>
                        <td style="padding: 16px">
                          <h3 style="margin: 0">Dear Tour Guide,</h3>
                          <p style="margin: 0">
                            We’re excited to share that we have a tour booking for you!
                            Here are the details you need to know.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <table
                            width="100%"
                            bgcolor="#ddd"
                            style="border-radius: 12px; padding: 16px"
                          >
                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">Booking Id:</small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${
                                    bookingData.booking_Confirmation_Url !== ""
                                      ? `
                                  <a
                                    target="_blank"
                                    href="${bookingData.booking_Confirmation_Url}"
                                    style="color: inherit; text-decoration: none"
                                  >
                                    ${bookingData.booking_Id} (view confirmation)
                                  </a>
                                  `
                                      : bookingData.booking_Id
                                  }
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">Tour Name:</small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${bookingData.tour_Name}
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    Tour Plan Name:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${bookingData.plans_List[0].plan_Title}
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    Tour Duration:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${formatSecondToDaysNights(bookingData.tour_Duration)}
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">Group Size:</small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${bookingData.total_Adult_Count} Adults ${
                                    bookingData.total_Child_Count > 0
                                      ? `${bookingData.total_Child_Count}`
                                      : ""
                                  }
                                </p>
                              </td>
                            </tr>

                            ${
                              bookingData.tour_Type === "Ticket-Only"
                                ? `
                              <tr>
                                <td>
                                  <p style="margin: 0">
                                    <small style="font-weight: normal">
                                      Visiting Time:
                                    </small>
                                  </p>
                                  <p style="font-weight: bold; margin: 0">
                                    ${convertTo12HourFormat(bookingData?.plans_List[0]?.plan_Pickup_Info?.time)}
                                  </p>
                                </td>
                              </tr>
                            `
                                : `
                              <tr>
                                <td>
                                  <p style="margin: 0">
                                    <small style="font-weight: normal">
                                      Pickup Location:
                                    </small>
                                  </p>
                                  <p style="font-weight: bold; margin: 0">
                                    ${bookingData.tour_Pickup_Address}
                                  </p>
                                </td>
                              </tr>
                            `
                            }

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    Tour Start Date:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  ${formatUTCToIST(bookingData.tour_Start_Date)}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table
                      width="100%"
                      style="background-color: #ffffff; border-radius: 12px"
                    >
                      <tr>
                        <td style="padding: 16px">
                          <h3 style="margin: 0">Guest Information</h3>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <table width="100%">
                            ${
                              bookingData.tour_Type === "Ticket-Only"
                                ? `
                              <tr>
                                <td>
                                  <p style="margin: 0">
                                    <small style="font-weight: normal">
                                      User Name:
                                    </small>
                                  </p>
                                  <p style="font-weight: bold; margin: 0">
                                  ${bookingData.visitor_Details
                                    .map((visitor, index) => `${visitor.name}`)
                                    .join(", ")}
                                </p>
                                </td>
                              </tr>
                            `
                                : `
                              <tr>
                                <td>
                                  <p style="margin: 0">
                                    <small style="font-weight: normal">
                                      User Name:
                                    </small>
                                  </p>
                                  <p style="font-weight: bold; margin: 0;">
                                    ${bookingData.user_Name}
                                  </p>
                                </td>
                              </tr>
                            `
                            }

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    User phone:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0;">
                                  ${bookingData.user_Phone_Number}
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    User Email:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0;">
                                  ${bookingData.user_Email_Id}
                                </p>
                              </td>
                            </tr>

                            ${
                              bookingData.tour_Type === "Ticket-Only"
                                ? `
                              <tr>
                                <td>
                                  <p style="margin: 0">
                                    <small style="font-weight: normal">
                                      User Documents:
                                    </small>
                                  </p>
                                  <p style="font-weight: bold; margin: 0;">
                                    ${bookingData.visitor_Details
                                      .map(
                                        (visitor, index) =>
                                          `${visitor.idType} - ${visitor.idNumber}`,
                                      )
                                      .join(", ")}
                                  </p>
                                </td>
                              </tr>
                            `
                                : ``
                            }
                            
                            ${
                              bookingData.user_Instructions
                                ? `
                              <tr>
                                <td>
                                  <p style="margin: 0">
                                    <small style="font-weight: normal">
                                      User Request:
                                    </small>
                                  </p>
                                  <p style="font-weight: bold; margin: 0;">
                                    ${bookingData.user_Instructions}
                                  </p>
                                </td>
                              </tr>
                            `
                                : ``
                            }
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table
                      width="100%"
                      style="background-color: #ffffff; border-radius: 12px"
                    >
                      <tr>
                        <td style="padding: 16px">
                          <h3 style="margin: 0">Payment Summary</h3>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <table width="100%">
                            <tr>
                              <td width="60%">
                                <h4>Booking Time</h4>
                                <h4 style="margin-top: 7px">Payment Mode</h4>
                                <h4 style="margin-top: 7px">Total Amount</h4>
                                ${bookingData.amount_Paid > 0 ? ` <h4 style="margin-top: 7px">Paid Amount</h4>` : ``}
                                ${bookingData.amount_Paid > 0 ? `<h4 style="margin-top: 7px">Amount Left To Pay</h4>` : ``}
                              </td>
                              <td width="40%" style="text-align: right">
                                <h4 style="white-space: no-wrap">${formatUTCToIST(getCurentDate(), true)}</h4>
                                <h4 style="margin-top: 7px">${bookingData.payment_Type}</h4>
                                <h4 style="margin-top: 7px">${totalAmount}</h4>
                                ${bookingData.amount_Paid > 0 ? `<h4 style="margin-top: 7px">${paidAmount}</h4>` : ``}
                                ${bookingData.amount_Paid > 0 ? `<h4 style="margin-top: 7px">${leftToPayAmount}</h4>` : ``}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 16px 16px 16px">
                    <table
                      width="100%"
                      style="background-color: #ffffff; border-radius: 12px"
                    >
                      <tr>
                        <td style="padding: 16px">
                          <h3 style="margin: 0">Need Help?</h3>
                          <p style="margin: 0">
                            Our friendly customer support team is here to assist you
                            with any questions or concerns you may have about your
                            booking.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 16px 16px 16px">
                          <table width="100%">
                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">Phone No:</small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  <a
                                    href="tel:+918527703312"
                                    style="color: #000; text-decoration: none"
                                  >
                                    918527703312
                                  </a>
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style="margin: 0">
                                  <small style="font-weight: normal">
                                    Email Address:
                                  </small>
                                </p>
                                <p style="font-weight: bold; margin: 0">
                                  <a
                                    href="mailto:staybookbooking@gmail.com"
                                    style="color: #000; text-decoration: none"
                                  >
                                    staybookbooking@gmail.com
                                  </a>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      color: #ffffff;
                      text-align: center;
                      border-top: 1px solid #dddddd;
                      padding: 16px;
                    "
                  >
                    <p style="margin: 0;">
                      Thank you for choosing Staybook. We look forward to providing you
                      with an exceptional experience.
                    </p>
                  </td>
                </tr>
              </table>
            </center>
          </body>
        </html>`,
    });

    return {
      status: true,
      data: response,
      message: `booking confirmation sent to tour operator - Staybook, ${senderEmail}`,
      error: null,
    };
  } catch (error: any) {
    console.log(
      "Error in tourGuideBookingConfirmationMail:",
      error?.message || error,
    );
    return {
      status: false,
      data: {},
      message: "",
      error: error?.message || error,
    };
  }
};

// Updateing the status of booking creation
export const tourPaymentInfoUpdation = async (
  userBooking: TourBookingDetails,
  bookingConfirmation: boolean = true,
) => {
  if (userBooking.payment_Type === "Pay at Tour") {
    return;
  }
  try {
    const docBookingRef = doc(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
      PAYMENT_INFO_COLLECTION_NAME,
      userBooking.booking_Id,
    );

    await updateDoc(docBookingRef, {
      booking_Confirmation: bookingConfirmation,
    });

    return {
      status: true,
    };
  } catch (error: any) {
    console.error(
      "Error in tourPaymentInfoUpdation: ",
      error?.message || error,
    );
    return {
      status: false,
    };
  }
};

// Booking will be stored for the user
export const tourFullCycleBookingCreation = async (
  bookingData: TourBookingDetails,
) => {
  try {
    const [
      userBookingInfo,
      operatorBookingInfo,
      staybookBookingInfo,
      userEmailInfo,
      paymentInfo,
    ] = await Promise.all([
      userTourBookingCreation(bookingData),
      operatorTourBookingCreation(bookingData),
      staybookTourBookingCreation(bookingData),
      userTourBookingConfirmationMail(bookingData),
      tourGuideBookingConfirmationMail(bookingData),
      tourPaymentInfoUpdation(bookingData, true),
    ]);

    return {
      status: true,
      message: "Data Added successfully!!",
      error: null,
    };
  } catch (error: any) {
    console.log(
      "Error in tourFullCycleBookingCreation: ",
      error?.message || error,
    );
    return {
      status: false,
      message: "Failed!",
      error: error?.message || error,
    };
  }
};

// Fetch Tour Booking Info
export const fetchTourPaymentBookingInfo = async (bookingId: string) => {
  let bookingInfo = new TourBookingDetails();
  const bookingDoc = doc(
    db,
    STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
    STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
    PAYMENT_INFO_COLLECTION_NAME,
    bookingId,
  );
  const bookingRef = await getDoc(bookingDoc);

  if (bookingRef.exists()) {
    bookingInfo = { ...bookingRef.data() } as TourBookingDetails;
    bookingInfo.booking_Time = formatTimestampToDate(
      bookingRef.data()?.booking_Time,
    );
    bookingInfo.tour_Start_Date = formatTimestampToDate(
      bookingRef.data()?.tour_Start_Date,
    );

    const tourPlanCol = collection(
      db,
      STAYBOOK_BOOKINGS_STATISTICS_COLLECTION_NAME,
      STAYBOOK_TOUR_BOOKINGS_SECTION_NAME,
      PAYMENT_INFO_COLLECTION_NAME,
      bookingId,
      TOUR_PLANS_BOOKING_COLLECTION_NAME,
    );
    const bookingPlanRef = await getDocs(tourPlanCol);
    const plansList: PlanDetails[] = [];
    for (let plan of bookingPlanRef.docs) {
      const planInfo = { ...plan.data() } as PlanDetails;
      plansList.push(planInfo);
    }
    bookingInfo.plans_List = plansList;

    return {
      status: true,
      data: bookingInfo,
    };
  } else {
    return {
      status: false,
      data: bookingInfo,
    };
  }
};
