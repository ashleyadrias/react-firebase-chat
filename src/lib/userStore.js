import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

// Switch between local and Firebase-hosted configurations
const useFirebaseConfig = true; // Set to `false` for local usage

let dbPromise;
if (useFirebaseConfig) {
  // Use Firebase-hosted services
  const { getFirebaseServices } = require("./firebase");
  dbPromise = getFirebaseServices().then(({ db }) => db);
} else {
  // Use local Firebase instance
  const { db } = require("./firebase");
  dbPromise = Promise.resolve(db);
}

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      // Dynamically fetch Firestore instance
      const db = await dbPromise;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));