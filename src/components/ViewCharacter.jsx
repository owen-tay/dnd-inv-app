import React, { useState, useEffect } from "react";
import { getDatabase, ref, update, onValue, off } from "firebase/database";
import { dbRef, uidCookie } from "../firebase";

export default function ViewCharacter() {

  const [characterName, setCharacterName] = useState(characterName);
  const [goldValue, setGoldValue] = useState(0);  // Initializing goldValue to 0!!!
  useEffect(() => {
    const handleValueChange = (snapshot) => {
      const data = snapshot.val();

      if (data) {
        if (data.name) {
          setCharacterName(data.name);
        }

        // Chheck if gold exists in the DB, if not set it to 0!!
        setGoldValue(data.gold || 0);
      }
    };

    onValue(dbRef, handleValueChange);

    return () => {
      off(dbRef, "value", handleValueChange);
    };
  }, []);

  const handleGoldChange = (delta) => {
    const newValue = goldValue + delta;
    setGoldValue(newValue);
    writeUserData2(newValue); 
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10) || 0;
    setGoldValue(newValue);
    writeUserData2(newValue); // Update here
  };

  function writeUserData2(gold) {
    const db = getDatabase();
    const reference = ref(db, "users/" + uidCookie);

    update(reference, { gold: gold }); // Use update here
  }

  return (
    <div className="mt-2">
      <h1 className=" text-2xl"> {characterName}</h1>
      <div className="mt-4">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-gray-300 flex items-center justify-center w-36 h-36">
            <button onClick={() => handleGoldChange(-1)}>-</button>
            <input
              className="w-8 text-center"
              type="number"
              value={goldValue}
              onChange={handleInputChange}
            />
            <button onClick={() => handleGoldChange(1)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}