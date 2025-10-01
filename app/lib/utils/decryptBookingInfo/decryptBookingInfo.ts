const CryptoJS = require("crypto-js");

const secretKey = CryptoJS.enc.Utf8.parse("1234567890123456");
const iv = CryptoJS.enc.Utf8.parse("6543210987654321");

export const decryptBookingInfo = (key: string = "bInfo") => {
  try {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) {
      console.log("No data found!");
      return { status: false, data: "" };
    }

    const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const plainText = decrypted.toString(CryptoJS.enc.Utf8);
    return { status: true, data: JSON.parse(plainText) };
  } catch (error: any) {
    console.error("Error in decryptBookingInfo", error.message || error);
    return { status: false, data: "" };
  }
};
