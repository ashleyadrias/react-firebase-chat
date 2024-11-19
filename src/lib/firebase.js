import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Dynamically fetch Firebase config from Firebase Function
const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch("https://us-central1-reactchat-7e9b0.cloudfunctions.net/getFirebaseConfig");
    if (!response.ok) {
      throw new Error("Failed to fetch Firebase config");
    }
    const config = await response.json();
    return config;
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return {}; // Handle the error case
  }
};

const initializeFirebase = async () => {
  const firebaseConfig = await fetchFirebaseConfig(); // Dynamically fetch the config
  
  // Only initialize Firebase if the config is available
  if (Object.keys(firebaseConfig).length > 0) {
    const app = initializeApp(firebaseConfig);
    return { 
      auth: getAuth(),
      db: getFirestore(),
      storage: getStorage()
    };
  } else {
    console.error("Failed to initialize Firebase: invalid config");
    return null;
  }
};

// Initialize Firebase with fetched config
initializeFirebase().then(({ auth, db, storage }) => {
  if (auth && db && storage) {
    console.log("Firebase initialized successfully!");
  }
});