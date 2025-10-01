const CryptoJS = require("crypto-js");

const secretKey = CryptoJS.enc.Utf8.parse("1234567890123456");
const iv = CryptoJS.enc.Utf8.parse("6543210987654321");

export const encryptData = (data: any) => {
  const stringData = JSON.stringify(data);

  const encryptedData = CryptoJS.AES.encrypt(stringData, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return encryptedData;
};

export const decryptData = (key: string) => {
  const decrypted = CryptoJS.AES.decrypt(key, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const plainText = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plainText);
};
