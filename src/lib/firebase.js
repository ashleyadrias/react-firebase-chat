import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Switch between local and hosted Firebase configurations
const useFirebaseConfig = true; // Set to `false` for local usage

// Local Firebase configuration (only used when `useFirebaseConfig` is false)
const localFirebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-7e9b0.firebaseapp.com",
  projectId: "reactchat-7e9b0",
  storageBucket: "reactchat-7e9b0.firebasestorage.app",
  messagingSenderId: "858649800389",
  appId: "1:858649800389:web:b67c998313649ed562caac",
};

let firebaseServices = {}; // Store initialized services here

const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch(
      "https://us-central1-reactchat-7e9b0.cloudfunctions.net/getFirebaseConfig"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Firebase config");
    }
    const config = await response.json();
    return config;
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return {}; // Return empty config in case of failure
  }
};

// Initialize Firebase dynamically
const initializeFirebase = async () => {
  if (Object.keys(firebaseServices).length === 0) {
    const firebaseConfig = useFirebaseConfig
      ? await fetchFirebaseConfig() // Dynamically fetch config when hosted
      : localFirebaseConfig; // Use local config when running locally

    if (Object.keys(firebaseConfig).length > 0) {
      const app = initializeApp(firebaseConfig);
      firebaseServices = {
        auth: getAuth(app),
        db: getFirestore(app),
        storage: getStorage(app), // Store storage service in the firebaseServices object
      };
    } else {
      throw new Error("Failed to initialize Firebase: invalid config");
    }
  }
  return firebaseServices;
};

// Explicitly export the Firebase services
export const getFirebaseServices = initializeFirebase;
export const getAuthService = () => getFirebaseServices().auth;
export const getDbService = () => getFirebaseServices().db;
export const getStorageService = async () => {
  const services = await getFirebaseServices();
  return services.storage; // Return storage from initialized services
};