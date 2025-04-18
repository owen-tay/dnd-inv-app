import React, { useState, useEffect } from "react";
import { FaCoins, FaUserAlt, FaHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";import { UserAuth } from "../context/AuthContext";
import { uploadImage } from "../firebase";
import {
  getStorage,
  ref as storageRef,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  getDatabase,
  ref,
  update,
  onValue,
  get,
  off,
  push,
  set,
  remove,
  query,
  orderByValue,
  equalTo,
  get as dbGet,

} from "firebase/database";
import { dbRef } from "../firebase";
import ItemComponent from "./ItemComponent";
import ApiFetch from "./ApiFetch";
import SpellComponent from "./SpellComponent";
import { v4 as uuidv4 } from "uuid";
import copyToClipboard from "../utils/copyToClipboard";

export default function ViewCharacter(props = {}) {
  const authCtx = UserAuth();                 // undefined on public page
  const user = props.user ?? authCtx?.user;   // use passed‑in user or logged‑in one
  const readOnly = props.readOnly ?? false;
  console.log(user.uid);
  const [characterName, setCharacterName] = useState("");
  const [goldValue, setGoldValue] = useState(0);
  const [levelValue, setLevelValue] = useState(0);
  const [currentHp, setCurrentHp] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [items, setItems] = useState([]);

  const [itemType, setItemType] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [imageURL, setImageURL] = useState("/profileStarter.png");

  const [imageScale, setImageScale] = useState(false);

  //this resets all the states
  const resetState = () => {
    setCharacterName("");
    setGoldValue(0);
    setLevelValue(0);
    setCurrentHp(0);
    setMaxHp(0);
    setItems([]);
    setItemType("");
    setItemName("");
    setItemDescription("");
  };

  //stats usestates
  const [strValue, setStrValue] = useState(1);
  const [dexValue, setDexValue] = useState(1);
  const [conValue, setConValue] = useState(1);
  const [intValue, setIntValue] = useState(1);
  const [wisValue, setWisValue] = useState(1);
  const [chaValue, setChaValue] = useState(1);

  //this is for the spells api
  const [selectedSpells, setSelectedSpells] = useState([]);

  const [selectedSpellInfo, setSelectedSpellInfo] = useState(null);





  const handleAddSpell = (selectedSpellInfo) => {
    if (selectedSpellInfo && !readOnly) {
      const db = getDatabase();



      const userSpellsRef = ref(db, `users/${user.uid}/spells`);

      // Push the selected spell's information to the users db collection
      const newSpellRef = push(userSpellsRef);

      set(newSpellRef, selectedSpellInfo);

      // Close poppupp
      window.my_modal_5.close();
    }
  };

  const lockable = (handler) =>
    readOnly
      ? { disabled: true, readOnly: true }        // shows value, no edits
      : { onChange: handler };                    // normal editable field

  //ablity score table function. this thing is massive
  const calculateBonus = (statValue) => {
    if (statValue <= 1) {
      return -5;
    } else if (statValue <= 3) {
      return -4;
    } else if (statValue <= 5) {
      return -3;
    } else if (statValue <= 7) {
      return -2;
    } else if (statValue <= 9) {
      return -1;
    } else if (statValue <= 11) {
      return 0;
    } else if (statValue <= 13) {
      return 1;
    } else if (statValue <= 15) {
      return 2;
    } else if (statValue <= 17) {
      return 3;
    } else if (statValue <= 19) {
      return 4;
    } else if (statValue <= 21) {
      return 5;
    } else if (statValue <= 23) {
      return 6;
    } else if (statValue <= 25) {
      return 7;
    } else if (statValue <= 27) {
      return 8;
    } else if (statValue <= 29) {
      return 9;
    } else {
      return 10;
    }
  };

  const [shareToken, setShareToken] = useState(null);
  const [shareUrl, setShareUrl]     = useState("");   // holds final URL
const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = async () => {
    if (!user?.uid || readOnly) return;

    const db = getDatabase();

    if (!shareToken) {
      const token = uuidv4();

      await set(ref(db, `shareTokens/${token}`), user.uid);
      await set(ref(db, `publicUsers/${user.uid}`), true);
      await update(ref(db, `users/${user.uid}`), { shareToken: token });
      setShareToken(token);

      const url = `${window.location.origin}/share/${token}`;
      setShareUrl(url);
      setShowShareModal(true);
      copyToClipboard(url); 
    }
    else {
      await remove(ref(db, `shareTokens/${shareToken}`));
      await remove(ref(db, `publicUsers/${user.uid}`));
      await update(ref(db, `users/${user.uid}`), { shareToken: null });
      setShareToken(null);
      setShareUrl("");
      setShowShareModal(false);
      alert("Sharing disabled.");
    }
  };

  const handleDeleteUserData = async () => {
    if (readOnly) return;
    
    const db = getDatabase();
    const userRef = ref(db, `users/${user.uid}`);

    // Remove the user's character data
    await set(userRef, null);

    // Remove the user's items
    const itemsRef = ref(db, `users/${user.uid}/items`);
    await set(itemsRef, null);

    // Remove the user's spells
    const spellsRef = ref(db, `users/${user.uid}/spells`);
    await set(spellsRef, null);

    // Reset the component state
    resetState();
  };



  useEffect(() => {
    // Reset state every time the user changes.
    resetState();

    if (!user) {
      return; // If no user
    }

    get(ref(getDatabase(), `users/${user.uid}/shareToken`)).then((snap) => {
      if (snap.exists() && snap.val()) setShareToken(snap.val());
    });

    const handleValueChange = (snapshot) => {
      const data = snapshot.val();

      if (data) {
        if (data.name) {
          setCharacterName(data.name);
        }
        setGoldValue(data.gold || 0);
        setLevelValue(data.level || 0);
        setCurrentHp(data.currentHp || 0);
        setMaxHp(data.maxHp || 0);
        setStrValue(data.str || 0);
        setDexValue(data.dex || 0);
        setConValue(data.con || 0);
        setIntValue(data.int || 0);
        setWisValue(data.wis || 0);
        setChaValue(data.cha || 0);

        // Set imageURL if it exists in the data
        if (data.imgurl) {
          setImageURL(data.imgurl);
        }
      }
    };

    const userDbRef = ref(getDatabase(), "users/" + user.uid);
    onValue(userDbRef, handleValueChange);
    const itemsRef = ref(getDatabase(), "users/" + user.uid + "/items");
    const handleItemsChange = (snapshot) => {
      const data = snapshot.val();
      const formattedItems = [];
      for (let key in data) {
        formattedItems.push({ id: key, ...data[key] });
      }
      setItems(formattedItems);
    };
    onValue(itemsRef, handleItemsChange);

    // Fetch selected spells from Firebase
    const spellsRef = ref(getDatabase(), `users/${user.uid}/spells`);
    onValue(spellsRef, (snapshot) => {
      const spellsData = snapshot.val();
      if (spellsData) {
        const spellsArray = Object.keys(spellsData).map((key) => ({
          id: key,
          ...spellsData[key],
        }));
        setSelectedSpells(spellsArray);
      } else {
        setSelectedSpells([]);
      }
    });

    const characterRef = ref(getDatabase(), `users/${user.uid}`);
    onValue(characterRef, handleValueChange);

    return () => {
      off(spellsRef, "value");
      off(characterRef, "value", handleValueChange);
      off(userDbRef, "value", handleValueChange);
      off(itemsRef, "value", handleItemsChange);
    };
  }, [user]);

  //image handler
  const handleImageUpload = async (e) => {
    if (readOnly) return;
    
    const file = e.target.files[0];

    if (file) {
      // File Type and Size Checks as above

      const db = getDatabase();
      const userRef = ref(db, "users/" + user.uid);

      // Retrieve existing imageURL from the database
      const snapshot = await get(userRef);
      if (snapshot.exists() && snapshot.val().imgurl) {
        const oldImageURL = snapshot.val().imgurl;

        // Get reference to old image in storage and delete it
        const storage = getStorage();
        const oldImageRef = storageRef(storage, oldImageURL);
        await deleteObject(oldImageRef);
      }

      try {
        const imageURL = await uploadImage(file, user.uid);

        // Save the new imageURL to the database
        update(userRef, {
          imgurl: imageURL,
        });
      } catch (error) {
        console.error("There was an error:", error);
      }
    }
  };

  const handleItemSubmit = () => {
    if (readOnly) return;
    
    const db = getDatabase();
    const itemsRef = ref(db, "users/" + user.uid + "/items");
    const newItemRef = push(itemsRef);

    set(newItemRef, {
      type: itemType,
      name: itemName,
      description: itemDescription,
    });
    window.my_modal_3.close();
  };

  const deleteItem = (itemId) => {
    if (readOnly) return;
    
    const itemRef = ref(
      getDatabase(),
      "users/" + user.uid + "/items/" + itemId
    );
    set(itemRef, null);
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const deleteSpell = (spellId) => {
    if (readOnly) return;
    
    const spellRef = ref(getDatabase(), `users/${user.uid}/spells/${spellId}`);
    set(spellRef, null);
  };

  const handleGoldChange = (delta) => {
    if (readOnly) return;
    
    const newValue = goldValue + delta;
    setGoldValue(newValue);
    writeUserData2(newValue, levelValue, currentHp, maxHp);
  };

  const handleInputChange = (e) => {
    if (readOnly) return;
    
    const newValue = parseInt(e.target.value, 10) || 0;
    setGoldValue(newValue);
    writeUserData2(newValue, levelValue, currentHp, maxHp);
  };

  const handleLevelChange = (delta) => {
    if (readOnly) return;
    
    const newValue = levelValue + delta;
    setLevelValue(newValue);
    writeUserData2(goldValue, newValue, currentHp, maxHp);
  };

  const handleHpChange = (type, delta) => {
    if (readOnly) return;
    
    const newValue = type === "current" ? currentHp + delta : currentHp;
    setCurrentHp(newValue);
    writeUserData2(goldValue, levelValue, newValue, maxHp);

    // Apply the scaling effect
    setImageScale(true);

    // Delay removing the scaling effect after 0.5 seconds
    setTimeout(() => {
      setImageScale(false);
    }, 200);

    if (type === "current") {
      const newValue = currentHp + delta;
      setCurrentHp(newValue);
      writeUserData2(goldValue, levelValue, newValue, maxHp);
    } else if (type === "max") {
      const newValue = maxHp + delta;
      setMaxHp(newValue);
      writeUserData2(goldValue, levelValue, currentHp, newValue);
    }
  };

  const handleHpInputChange = (type, e) => {
    if (readOnly) return;
    
    const newValue = parseInt(e.target.value, 10) || 0;
    if (type === "current") {
      setCurrentHp(newValue);
      writeUserData2(goldValue, levelValue, newValue, maxHp);
    } else if (type === "max") {
      setMaxHp(newValue);
      writeUserData2(goldValue, levelValue, currentHp, newValue);
    }
  };

  function writeUserData2(
    gold,
    level,
    currentHp,
    maxHp,
    str,
    dex,
    con,
    int,
    wis,
    cha
  ) {
    if (readOnly) return;
    
    const db = getDatabase();
    const reference = ref(db, "users/" + user.uid);

    const updateObject = {
      gold: gold,
      level: level,
      currentHp: currentHp,
      maxHp: maxHp,
    };

    if (str !== undefined) updateObject.str = str;
    if (dex !== undefined) updateObject.dex = dex;
    if (con !== undefined) updateObject.con = con;
    if (int !== undefined) updateObject.int = int;
    if (wis !== undefined) updateObject.wis = wis;
    if (cha !== undefined) updateObject.cha = cha;

    update(reference, updateObject);
  }

  useEffect(() => {
    if (characterName) {
      document.title = readOnly
        ? `${characterName} · read‑only`
        : `${characterName} · Dashboard`;
    }
  }, [characterName, readOnly]);

  const toggleVisibility = () => {
    const hideshowDiv = document.getElementById("showHide");
    hideshowDiv.classList.toggle("hidden");



  };

  return (
    <div className="mt-2">
      {readOnly && (
        <p className="text-center text-md mb-4 text-secondary animate-pulse">
          Live&nbsp;view &bull; editing disabled
        </p>
      )}

      <h1 className="text-center text-4xl font-bold my-4 text-base-content">
        {characterName}
      </h1>
      <div className="w-full justify-center flex">
      {!readOnly && (
  <button
    className={`btn my-4 mr-2 flex items-center gap-2 ${
      shareToken ? "btn-primary" : "btn-secondary"
    }`}
    onClick={handleShare}
  >
    <FiShare2 size={18} />
    {shareToken ? "Stop Sharing" : "Share"}
  </button>
)}
</div>
      <div className="flex justify-center">
        <img
          src={imageURL}
          alt="profile pic"
          className={`object-cover w-48 h-48 rounded-full border-2 m-5 ease-in-out duration-75 ${
            imageScale ? " scale-110 border-primary " : ""
          }`}
        />
        
      </div>

      <div className="flex w-screen justify-center">
        <dialog id="my_modal_2" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg justify-center text-center">
              Add an Image for your character.
            </h3>
            <div className="flex flex-cp justify-center">
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                {...lockable(handleImageUpload)}
                disabled={readOnly}
              />
              <button className="btn btn-secondary" disabled={readOnly}>Submit</button>
            </div>
          </form>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      <div className="mx-8 sm:mx-48">
        <div className="flex justify-center">
          <p className="text-lg text-base-content">0HP</p>
          <input
            type="range"
            min={0}
            max={maxHp}
            value={currentHp}
            className="range range-secondary cursor-auto"
            disabled={readOnly}
          />
          <p className="text-lg">{maxHp}HP</p>
        </div>
        <div className="flex justify-center">
          <FaHeart
            className={`text-secondary absolute mb-9 -z-10 ease-in-out duration-75 ${
              imageScale ? " scale-110 border-primary " : ""
            }`}
            size="55"
          />
          <span className="text-xl text-white mt-2">
            {currentHp}
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-9 my-2">
        <button
          className="btn btn-active btn-primary w-16"
          onClick={() => handleHpChange("current", -1)}
          disabled={readOnly}
        >
          1 Damage
        </button>
        <button
          className="btn btn-active btn-secondary w-16"
          onClick={() => handleHpChange("current", 1)}
          disabled={readOnly}
        >
          1 Heal
        </button>
      </div>

      <div className="flex justify-center">
        <div className="form-control">
          <label className="cursor-pointer label">
            <input
              id="hideshowcheck"
              type="checkbox"
              className="toggle toggle-secondary"
              {...lockable(toggleVisibility)}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <p className="mb-2">Hide/Show Stats</p>
      </div>
      <div id="showHide" className=" ">
        <div className="flex flex-wrap justify-center gap-1">
          <div className="flex flex-col bg-base-200 w-20 h-20 items-center justify-center rounded-lg">
            <p className="text-xs">STR</p>
            <p id="strBonus" className="text-md">
              {calculateBonus(strValue)}
            </p>

            <div className="w-20 flex justify-center">
              <input
                id="strInput"
                className="w-10"
                type="number"
                value={strValue}
                {...lockable((e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  setStrValue(newValue);
                  writeUserData2(
                    goldValue,
                    levelValue,
                    currentHp,
                    maxHp,
                    newValue,
                    dexValue,
                    conValue,
                    intValue,
                    wisValue,
                    chaValue
                  );
                })}
              />
            </div>
          </div>
          <div className="flex flex-col bg-base-200 w-20 h-20 items-center justify-center rounded-lg">
            <p className="text-xs">DEX</p>
            <p id="dexBonus" className="text-md">
              {calculateBonus(dexValue)}
            </p>

            <div className="w-20 flex justify-center">
              <input
                id="dexInput"
                className="w-10"
                type="number"
                value={dexValue}
                {...lockable((e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  setDexValue(newValue);
                  writeUserData2(
                    goldValue,
                    levelValue,
                    currentHp,
                    maxHp,
                    strValue,
                    newValue,
                    conValue,
                    intValue,
                    wisValue,
                    chaValue
                  );
                })}
              />
            </div>
          </div>
          <div className="flex flex-col bg-base-200 w-20 h-20 items-center justify-center rounded-lg">
            <p className="text-xs">CON</p>
            <p id="conBonus" className="text-md">
              {calculateBonus(conValue)}
            </p>

            <div className="w-20 flex justify-center">
              <input
                id="conInput"
                className="w-10"
                type="number"
                value={conValue}
                {...lockable((e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  setConValue(newValue);
                  writeUserData2(
                    goldValue,
                    levelValue,
                    currentHp,
                    maxHp,
                    strValue,
                    dexValue,
                    newValue,
                    intValue,
                    wisValue,
                    chaValue
                  );
                })}
              />
            </div>
          </div>
          <div className="flex flex-col bg-base-200 w-20 h-20 items-center justify-center rounded-lg">
            <p className="text-xs">INT</p>
            <p id="intBonus" className="text-md">
              {calculateBonus(intValue)}
            </p>

            <div className="w-20 flex justify-center">
              <input
                id="intInput"
                className="w-10"
                type="number"
                value={intValue}
                {...lockable((e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  setIntValue(newValue);
                  writeUserData2(
                    goldValue,
                    levelValue,
                    currentHp,
                    maxHp,
                    strValue,
                    dexValue,
                    conValue,
                    newValue,
                    wisValue,
                    chaValue
                  );
                })}
              />
            </div>
          </div>
          <div className="flex flex-col bg-base-200 w-20 h-20 items-center justify-center rounded-lg">
            <p className="text-xs">WIS</p>
            <p id="wisBonus" className="text-md">
              {calculateBonus(wisValue)}
            </p>

            <div className="w-20 flex justify-center">
              <input
                id="wisInput"
                className="w-10"
                type="number"
                value={wisValue}
                {...lockable((e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  setWisValue(newValue);
                  writeUserData2(
                    goldValue,
                    levelValue,
                    currentHp,
                    maxHp,
                    strValue,
                    dexValue,
                    conValue,
                    intValue,
                    newValue,
                    chaValue
                  );
                })}
              />
            </div>
          </div>
          <div className="flex flex-col bg-base-200 w-20 h-20 items-center justify-center rounded-lg">
            <p className="text-xs">CHA</p>
            <p id="chaBonus" className="text-md">
              {calculateBonus(chaValue)}
            </p>

            <div className="w-20 flex justify-center">
              <input
                id="chaInput"
                className="w-10"
                type="number"
                value={chaValue}
                {...lockable((e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  setChaValue(newValue);
                  writeUserData2(
                    goldValue,
                    levelValue,
                    currentHp,
                    maxHp,
                    strValue,
                    dexValue,
                    conValue,
                    intValue,
                    wisValue,
                    newValue
                  );
                })}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-36 h-36">
              <p className="text-lg text-base-content">Gold</p>
              <button
                className="text-2xl m-2"
                onClick={() => handleGoldChange(-1)}
                disabled={readOnly}
              >
                -
              </button>
              <input
                className="w-10 text-center"
                type="number"
                value={goldValue}
                {...lockable(handleInputChange)}
              />
              <button
                className="text-2xl m-2"
                onClick={() => handleGoldChange(1)}
                disabled={readOnly}
              >
                +
              </button>
              <div className="flex justify-center items-center text-secondary">
                <FaCoins size="50" />
              </div>
            </div>
            <div className="w-36 h-36">
              <p className="text-lg text-base-content">Level</p>
              <button
                className="text-2xl m-2"
                onClick={() => handleLevelChange(-1)}
                disabled={readOnly}
              >
                -
              </button>
              <input
                className="w-10 text-center"
                type="number"
                value={levelValue}
                {...lockable((e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  setLevelValue(newValue);
                  writeUserData2(goldValue, newValue, currentHp, maxHp);
                })}
              />
              <button
                className="text-2xl m-2"
                onClick={() => handleLevelChange(1)}
                disabled={readOnly}
              >
                +
              </button>
              <div className="flex justify-center items-center text-secondary">
                <FaUserAlt size="50" />
              </div>
            </div>

            {/* Current HP input field */}
            <div className="w-52 h-36">
              <p className="text-lg text-base-content">HP/MaxHP</p>
              <button
                className="text-2xl m-2"
                onClick={() => handleHpChange("current", -1)}
                disabled={readOnly}
              >
                -
              </button>
              <input
                className="w-10 text-center"
                type="number"
                value={currentHp}
                {...lockable((e) => handleHpInputChange("current", e))}
              />
              <button
                className="text-2xl m-2"
                onClick={() => handleHpChange("current", 1)}
                disabled={readOnly}
              >
                +
              </button>
              <span className="text-2xl">/</span>
              <button
                className="text-2xl m-2"
                onClick={() => handleHpChange("max", -1)}
                disabled={readOnly}
              >
                -
              </button>
              <input
                className="w-10 text-center"
                type="number"
                value={maxHp}
                {...lockable((e) => handleHpInputChange("max", e))}
              />
              <button
                className="text-2xl m-2"
                onClick={() => handleHpChange("max", 1)}
                disabled={readOnly}
              >
                +
              </button>
              <div className="flex justify-center text-secondary items-center">
                <FaHeart size="50" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 justify-center flex gap-2" id="items">
          <button
            className="btn btn-secondary"
            onClick={() => window.my_modal_3.showModal()}
            disabled={readOnly}
          >
            Add Item
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => window.my_modal_2.showModal()}
            disabled={readOnly}
          >
            Add Image
          </button>
          <ApiFetch 
            user={user} 
            handleAddSpellProp={handleAddSpell} 
            disabled={readOnly}
          />
          <dialog id="my_modal_3" className="modal">
            <div className="w-fit sm:w-96">
              <form
                method="dialog"
                className="modal-box"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleItemSubmit();
                }}
              >
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => {
                    window.my_modal_3.close(); //this should close the modal on click
                  }}
                >
                  ✕
                </button>
                <h3 className="font-bold text-lg"></h3>
                <p className="py-4">Item Type</p>
                <select
                  className="select select-bordered w-full max-w-xs"
                  required
                  value={itemType}
                  {...lockable((e) => setItemType(e.target.value))}
                >
                  <option value="" disabled>
                    Pick an item type
                  </option>
                  <option value="Weapon">Weapon</option>
                  <option value="Magical Item">Magical Item</option>
                  <option value="Supplies">Supplies</option>
                  <option value="Other">Other</option>
                </select>
                <p className="py-4">Item Name</p>
                <input
                  type="text"
                  required
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={itemName}
                  {...lockable((e) => setItemName(e.target.value))}
                />
                <p className="py-4">Item Description</p>
                <textarea
                  className="textarea textarea-bordered w-full max-w-xs"
                  placeholder="Bio"
                  maxLength="1000"
                  required
                  value={itemDescription}
                  {...lockable((e) => setItemDescription(e.target.value))}
                ></textarea>
                <p></p>
                <div className="flex justify-center">
                  <button type="submit" className="btn mt-2 btn-secondary" disabled={readOnly}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
      <h2 className="text-center m-4 font-bold text-xl">Items:</h2>
      <div
        id="viewItems"
        className="mt-4 justify-center flex flex-wrap gap-5 mb-10"
      >
        {items.map((item) => (
          <ItemComponent key={item.id} item={item} onDelete={deleteItem} readOnly={readOnly} />
        ))}
      </div>
      <h2 className="text-center m-4 font-bold text-xl">Spells:</h2>

      <div
        className="mt-4 justify-center flex flex-wrap gap-5 mb-10"
        id="spells"
      >
        {selectedSpells.map((spell) => (
          <SpellComponent key={spell.id} spell={spell} onDelete={deleteSpell} readOnly={readOnly} />
        ))}
      </div>
      <div className="flex justify-center">

      
        <button
          className="btn btn-primary my-4"
          onClick={() => window.my_modal_1.showModal()}
          disabled={readOnly}
        >
          Delete Character
        </button>
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg text-center">
              Are you Sure you want to delete this character?!
            </h3>
            <p className="py-1 text-center">
              This cannot be reversed.
              <div className="flex flex-col gap-4 items-center justify-center mt-5">
                <button
                  className="btn btn-primary w-52"
                  onClick={() => handleDeleteUserData()}
                  disabled={readOnly}
                >
                  Delete Character
                </button>
                <button className="w-52 btn">Close</button>
                <div className="modal-action"></div>
              </div>
            </p>
          </form>
        </dialog>
      </div>
      {showShareModal && (
  <dialog open className="modal modal-middle">
    <form method="dialog" className="modal-box">
      <h3 className="font-bold text-lg flex items-center gap-2">
        <FiShare2 size={20} /> Share Link
      </h3>

      <p className="py-4">Copy and send this read‑only link:</p>

      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered w-full"
          value={shareUrl}
          readOnly
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => copyToClipboard(shareUrl)}
        >
          Copy
        </button>
      </div>

      <div className="modal-action justify-center">
        <button className="btn" onClick={() => setShowShareModal(false)}>
          Close
        </button>
      </div>
    </form>
  </dialog>
)}

    </div>

    
  );

  
}