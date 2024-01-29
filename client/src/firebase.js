// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-8ebb7.firebaseapp.com",
  projectId: "real-estate-8ebb7",
  storageBucket: "real-estate-8ebb7.appspot.com",
  messagingSenderId: "530953915328",
  appId: "1:530953915328:web:353b2a12df3993182e1625",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
