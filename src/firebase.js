// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { UserAuth } from "./context/AuthContext";
import { getAuth } from "firebase/auth";

import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { getDatabase, ref, set, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//image upload stuff
export async function uploadImage(file, userId) {
  const storage = getStorage();
  const imagePath = `users/${userId}/profileImage/${file.name}`;
  const imageRef = storageRef(storage, imagePath);

  const uploadTask = uploadBytesResumable(imageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function ...
      },
      (error) => {
        // Error handling...
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(imageRef);
        resolve(downloadURL);
      }
    );
  });
}
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.log(process.env.REACT_APP_FUCKER);



// Initialize Firebase and db
const app = initializeApp(firebaseConfig);
export const db = getDatabase();

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

//get userid

export const auth = getAuth(app);

export function writeUserData(userId, name) {
  const reference = ref(db, "users/" + userId);

  set(reference, {
    name: name,
  });
}

//console.log(user.uid);
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export const uidCookie = getCookie("userUID");

export const dbRef = ref(db, "users/" + uidCookie);

onValue(dbRef, (snapshot) => {
  const data = snapshot.val();
  //console.log(data);
  return data;
});
