import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import CreateCharacter from "../components/CreateCharacter";
import ViewCharacter from "../components/ViewCharacter";
import { getDatabase, ref, onValue } from "firebase/database";

export const Account = () => {
  const { logOut, user } = UserAuth();
  const [characterExists, setCharacterExists] = useState(false);

  useEffect(() => {
    if (user && user.uid) {
      // Reference to the user's data in the Realtime Database
      const db = getDatabase();
      const characterRef = ref(db, "users/" + user.uid);

      // Listen to changes in the specified reference
      const unsubscribe = onValue(characterRef, (snapshot) => {
        console.log("Snapshot value:", snapshot.val());
        if (snapshot.exists()) {
          console.log("Data exists for user:", user.uid);
          setCharacterExists(true);
        }
      });

      // Cleanup function to unsubscribe from the listener when the component is unmounted
      return () => unsubscribe();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
     
      {!characterExists ? <CreateCharacter /> : <ViewCharacter />}
    </div>
  );
  
};

export default Account;
