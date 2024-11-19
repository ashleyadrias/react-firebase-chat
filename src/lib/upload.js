import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getFirebaseServices } from "./firebase";

// Switch between local and Firebase-hosted configurations
const useFirebaseConfig = true; // Set to `false` for local usage

// Local Firebase configuration (only used when `useFirebaseConfig` is false)
import { storage as localStorage } from "./firebase";

const upload = async (file) => {
  let storageInstance;

  if (useFirebaseConfig) {
    // Use hosted Firebase services
    const { storage } = await getFirebaseServices();
    storageInstance = storage;
  } else {
    // Use local Firebase configuration
    storageInstance = localStorage;
  }

  const date = new Date();
  const storageRef = ref(storageInstance, `images/${date.toISOString()}-${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        reject("Something went wrong! " + error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;