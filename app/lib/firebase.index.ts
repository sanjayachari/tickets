// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const Config = {
  apiKey: "AIzaSyAovnsa3ObT8NYfqvlQyy00g-hFl5Snd8g",
  authDomain: "spiritual-aloe-372507.firebaseapp.com",
  projectId: "spiritual-aloe-372507",
  storageBucket: "spiritual-aloe-372507.appspot.com",
  messagingSenderId: "533431675194",
  appId: "1:533431675194:web:40a8a5d16776fa89464803",
  measurementId: "G-35L984LSBK",
};

// Initialize Firebase
export const app = initializeApp(Config);
export const auth = getAuth(app);
export const db = getFirestore();
export const googleAuthProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const timestamp = serverTimestamp;
