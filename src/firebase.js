// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIG4yhBu_ijfkzI0QoNeTvkPwdCP0iMQw",
  authDomain: "auth-yt-53bed.firebaseapp.com",
  projectId: "auth-yt-53bed",
  storageBucket: "auth-yt-53bed.appspot.com",
  messagingSenderId: "929581945000",
  appId: "1:929581945000:web:70541f272ef110b2f8f29d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app);
