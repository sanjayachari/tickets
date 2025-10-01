import { TourBookingDetails } from "@/app/classes/bookings/tourBookingDetails";
import { removeKeyFromLocalStorage } from "../removeKeyFromLocalStorage/removeKeyFromLocalStorage";

const CryptoJS = require("crypto-js");
const secretKey = CryptoJS.enc.Utf8.parse("1234567890123456");
const iv = CryptoJS.enc.Utf8.parse("6543210987654321");

export const encryptBookingInfo = (
  bookingCnfInfo:
    | TourBookingDetails,
  key: string = "bInfo",
) => {
  removeKeyFromLocalStorage("tInfo");

  const stringData = JSON.stringify(bookingCnfInfo);

  const encrypted = CryptoJS.AES.encrypt(stringData, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  localStorage.setItem(key, encrypted);
};
