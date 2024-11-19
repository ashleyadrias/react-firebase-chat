import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Toggle for local or hosted environment
const useFirebaseConfig = true; // Set to `true` for hosted, `false` for local

let firebaseServices = {}; // Store initialized services here

const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch(
      "https://us-central1-reactchat-7e9b0.cloudfunctions.net/getFirebaseConfig"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Firebase config");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return {}; // Handle the error case
  }
};

const initializeLocalFirebase = () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "reactchat-7e9b0.firebaseapp.com",
    projectId: "reactchat-7e9b0",
    storageBucket: "reactchat-7e9b0.firebasestorage.app",
    messagingSenderId: "858649800389",
    appId: "1:858649800389:web:b67c998313649ed562caac",
  };

  const app = initializeApp(firebaseConfig);
  return {
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
  };
};

const initializeFirebase = async () => {
  if (Object.keys(firebaseServices).length === 0) {
    if (useFirebaseConfig) {
      const firebaseConfig = await fetchFirebaseConfig(); // Fetch from the hosted function
      if (Object.keys(firebaseConfig).length > 0) {
        const app = initializeApp(firebaseConfig);
        firebaseServices = {
          auth: getAuth(app),
          db: getFirestore(app),
          storage: getStorage(app),
        };
      } else {
        throw new Error("Failed to initialize Firebase: invalid hosted config");
      }
    } else {
      // Use local Firebase config
      firebaseServices = initializeLocalFirebase();
    }
  }
  return firebaseServices;
};

// Export Firebase services
export const getFirebaseServices = initializeFirebase;