import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { getDatabase, ref, set, onValue, off } from "firebase/database";
import { dbRef } from "../firebase";

export default function ViewCharacter() {
  const [characterName, setCharacterName] = useState("");
  const [characterRace, setCharacterRace] = useState("");
  const [characterType, setCharacterType] = useState(""); // 1. Define state variable

  useEffect(() => {
    const handleValueChange = (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Check if data exists
        const dbCharacter = Object.values(data);

        if (dbCharacter.length >= 3) {
          setCharacterName(dbCharacter[0] || "");
          setCharacterRace(dbCharacter[1] || "");
          setCharacterType(dbCharacter[2] || "");
        }
      }
    };
    onValue(dbRef, handleValueChange);

    return () => {
        off(dbRef, "value", handleValueChange);
    };
  }, []); // The empty dependency array means this useEffect runs once when the component mounts

  return (
    <div>
      ViewCharacter
      <p>Name: {characterName}</p> 
      <p>Race: {characterRace}</p> 
      <p>Type: {characterType}</p> 
    </div>
  );
}
