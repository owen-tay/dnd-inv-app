import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import CreateCharacter from "../components/CreateCharacter";
import ViewCharacter from "../components/ViewCharacter";
import { getDatabase, ref, onValue } from "firebase/database";
import { FaDiceD20 } from "react-icons/fa";

export const Account = () => {
  const { logOut, user } = UserAuth();
  const [characterExists, setCharacterExists] = useState(null);
  const [loading, setLoading] = useState(true); // Start as true

  useEffect(() => {
    if (user && user.uid) {
      const db = getDatabase();
      const characterRef = ref(db, "users/" + user.uid);

      const unsubscribe = onValue(characterRef, (snapshot) => {
        if (snapshot.exists()) {
          setCharacterExists(true);
        } else {
          setCharacterExists(false);
        }

        setTimeout(() => {
          setLoading(false);
        }, 500);


        

      });

      return () => unsubscribe();
    }
  }, [user]);

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
  }

  React.useEffect(() => {
    if (user?.uid) {
      setCookie("userUID", user.uid, 7); // setting cookie for 7 dayss
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="text-2xl flex  w-full  h-96 justify-center items-center ">
              <FaDiceD20 size="30" className=" animate-spin" />
              Loading<span className="loading loading-dots loading-xs mt-6"></span>
    </div>;
  }

  
  if (characterExists === null) {
    return null; 
  }

  return (
    <div>{!characterExists ? <CreateCharacter /> : <ViewCharacter />}</div>
  );
};

export default Account;
