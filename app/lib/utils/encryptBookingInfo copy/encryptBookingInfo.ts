const CryptoJS = require("crypto-js");
const secretKey = CryptoJS.enc.Utf8.parse("1234567890123456");
const iv = CryptoJS.enc.Utf8.parse("6543210987654321");

import { ActivityBookingDetails } from "@/lib/classModels/bookings/activityBookingDetails";
import { TourBookingDetails } from "@/lib/classModels/bookings/tourBookingDetails";
import { BookingConfirmationState } from "@/lib/redux/bookingConfirmationSlice";
import { removeKeyFromLocalStorage } from "..";

export const encryptBookingInfo = (
  bookingCnfInfo:
    | BookingConfirmationState
    | TourBookingDetails
    | ActivityBookingDetails,
  key: string = "bInfo",
) => {
  removeKeyFromLocalStorage("bInfo");
  removeKeyFromLocalStorage("tInfo");
  removeKeyFromLocalStorage("aInfo");

  const stringData = JSON.stringify(bookingCnfInfo);

  const encrypted = CryptoJS.AES.encrypt(stringData, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  localStorage.setItem(key, encrypted);
};
