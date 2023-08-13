// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { UserAuth } from "./context/AuthContext";
import { getAuth } from "firebase/auth";

import { getDatabase, ref, set, onValue } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDIG4yhBu_ijfkzI0QoNeTvkPwdCP0iMQw",

  authDomain: "auth-yt-53bed.firebaseapp.com",

  databaseURL:
    "https://auth-yt-53bed-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "auth-yt-53bed",

  storageBucket: "auth-yt-53bed.appspot.com",

  messagingSenderId: "929581945000",

  appId: "1:929581945000:web:70541f272ef110b2f8f29d",
};

// Initialize Firebase and db
const app = initializeApp(firebaseConfig);
export const db = getDatabase();

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
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}



  export const uidCookie = getCookie('userUID');


export const dbRef = ref(db, 'users/' + uidCookie);

onValue(dbRef, (snapshot) => {
  const data = snapshot.val();
  //console.log(data);
return data;

});


