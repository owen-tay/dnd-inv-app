import React, { useEffect, useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";

const ApiFetch = ({ user, handleAddSpellProp }) => {
  const [spells, setSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);

  const fetchSpellData = () => {
    fetch("https://www.dnd5eapi.co/api/spells")
      .then((response) => response.json())
      .then((data) => {
        setSpells(data.results);
      });
  };

  const fetchSpellDetails = (url) => {
    fetch(`https://www.dnd5eapi.co${url}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedSpell(data);
      });
  };

  const handleSpellSelection = (event) => {
    const selectedSpellIndex = event.target.value;
    const selectedSpellData = spells.find(
      (spell) => spell.name === selectedSpellIndex
    );
    if (selectedSpellData) {
      fetchSpellDetails(selectedSpellData.url);
    }
  };

  useEffect(() => {
    fetchSpellData();
  }, []);

  const handleAddSpell = (selectedSpellInfo) => {
    if (selectedSpellInfo) {
      const db = getDatabase();
      const userSpellsRef = ref(db, `users/${user.uid}/spells`);
      const newSpellRef = push(userSpellsRef);
      set(newSpellRef, selectedSpellInfo);

      // Close the modal after adding the spell
      window.my_modal_5.close();
    }
  };

  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => window.my_modal_5.showModal()}
      >
        Add Spell
      </button>
      <dialog id="my_modal_5" className="modal ">
        <form method="dialog" className="modal-box">
          <div className="flex justify-center flex-col items-center">
            <h3 className="font-bold text-lg">Select A Spell</h3>
            <p className="py-4">
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={handleSpellSelection} // Add the event handler here
              >
                <option disabled selected>
                  Select a spell
                </option>
                {spells.map((spell) => (
                  <option key={spell.index}>{spell.name}</option>
                ))}
              </select>
            </p>
          </div>

          {selectedSpell && (
            <div className=" overflow-auto max-h-96 h-96">
              <h2 className=" font-bold text-xl">{selectedSpell.name}</h2>
              <p className="text-lg">Level:{selectedSpell.level}</p>
              <p className="mt-2">{selectedSpell.desc}</p>
              <p className="mt-2">{selectedSpell.higher_level}</p>
              <p className="mt-2">Components: {selectedSpell.material}</p>
              <p className="mt-2">Duration: {selectedSpell.duration}</p>
            </div>
          )}
          <div className="modal-action flex justify-center">
            <button
              className="btn btn-secondary"
              onClick={() => handleAddSpell(selectedSpell)} // Use selectedSpell
            >
              Add Spell
            </button>

            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ApiFetch;
