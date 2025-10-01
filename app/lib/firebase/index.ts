// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Decode Firebase config from Base64 environment variable
const firebaseConfigBase64 = process.env.NEXT_PUBLIC_FIREBASE_CONFIG_BASE64;
if (!firebaseConfigBase64) {
  throw new Error("Missing NEXT_PUBLIC_FIREBASE_CONFIG_BASE64 environment variable");
}

const firebaseConfig = JSON.parse(
  typeof window === "undefined"
    ? Buffer.from(firebaseConfigBase64, "base64").toString("utf-8")
    : atob(firebaseConfigBase64)
);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore
export const db = getFirestore(app);
export const firestore = db; // alias for clarity
export const timestamp = serverTimestamp;

// Storage
export const storage = getStorage(app);
