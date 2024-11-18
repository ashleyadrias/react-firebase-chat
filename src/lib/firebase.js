import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-7e9b0.firebaseapp.com",
  projectId: "reactchat-7e9b0",
  storageBucket: "reactchat-7e9b0.firebasestorage.app",
  messagingSenderId: "858649800389",
  appId: "1:858649800389:web:b67c998313649ed562caac",
  measurementId: "G-NX84ZZ6XQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export storage and auth
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()