import React, { useState, useEffect } from "react";
import { FaCoins, FaUserAlt, FaHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { uploadImage, writeUserData } from "../firebase";
import { getStorage, ref as storageRef, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';




import {
  getDatabase,
  ref,
  update,
  onValue,
  get,
  off,
  push,
  set,
} from "firebase/database";
import { dbRef, uidCookie } from "../firebase";
import ItemComponent from "./ItemComponent";

export default function ViewCharacter() {
  const { user } = UserAuth();
  console.log(user.uid);
  const [characterName, setCharacterName] = useState("");
  const [goldValue, setGoldValue] = useState(0);
  const [levelValue, setLevelValue] = useState(0);
  const [currentHp, setCurrentHp] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [items, setItems] = useState([]);

  const [itemType, setItemType] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [imageURL, setImageURL] = useState("/profileStarter.png");

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

  useEffect(() => {
    // Reset state every time the user changes.
    resetState();

    if (!user) {
      return; // If no user, don't proceed.
    }

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

        // Set imageURL if it exists in the data
        if (data.imgurl) {
          setImageURL(data.imgurl);
        }
      }
    };

    // Construct the dbRef inside the useEffect using the user's UID.
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

    return () => {
      off(userDbRef, "value", handleValueChange);
      off(itemsRef, "value", handleItemsChange);
    };
  }, [user]);

  //image handler

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // File Type and Size Checks as above...
      
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
    const db = getDatabase();
    const itemsRef = ref(db, "users/" + user.uid + "/items");
    const newItemRef = push(itemsRef);

    set(newItemRef, {
      type: itemType,
      name: itemName,
      description: itemDescription,
    });
  };

  const deleteItem = (itemId) => {
    const itemRef = ref(
      getDatabase(),
      "users/" + user.uid + "/items/" + itemId
    );
    set(itemRef, null);
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleGoldChange = (delta) => {
    const newValue = goldValue + delta;
    setGoldValue(newValue);
    writeUserData2(newValue, levelValue, currentHp, maxHp);
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10) || 0;
    setGoldValue(newValue);
    writeUserData2(newValue, levelValue, currentHp, maxHp);
  };

  const handleLevelChange = (delta) => {
    const newValue = levelValue + delta;
    setLevelValue(newValue);
    writeUserData2(goldValue, newValue, currentHp, maxHp);
  };

  const handleHpChange = (type, delta) => {
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
    const newValue = parseInt(e.target.value, 10) || 0;
    if (type === "current") {
      setCurrentHp(newValue);
      writeUserData2(goldValue, levelValue, newValue, maxHp);
    } else if (type === "max") {
      setMaxHp(newValue);
      writeUserData2(goldValue, levelValue, currentHp, newValue);
    }
  };

  function writeUserData2(gold, level, currentHp, maxHp) {
    const db = getDatabase();
    const reference = ref(db, "users/" + user.uid);
    update(reference, {
      gold: gold,
      level: level,
      currentHp: currentHp,
      maxHp: maxHp,
    });
  }

  return (
    <div className="mt-2">
      <h1 className=" text-center text-3xl font-bold text-">
        {" "}
        {characterName}
      </h1>
      <div className="flex justify-center w-screen">
        <img
          src={imageURL}
          alt="profile pic"
          className="object-cover w-40 h-40 rounded-full border-2 m-5"
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
                onChange={handleImageUpload}
              />
              <button className="btn btn-accent">Submit</button>
            </div>
          </form>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div className=" mx-8 sm:mx-48">
        <div className="flex justify-center ">
          <p className=" text-lg">0HP</p>
          <input
            type="range"
            min={0}
            max={maxHp}
            value={currentHp}
            className="range range-accent  cursor-auto"
          />
          <p className=" text-lg">{maxHp}HP</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="  w-36 h-36">
            <p className=" text-lg">Gold</p>
            <button
              className=" text-2xl m-2"
              onClick={() => handleGoldChange(-1)}
            >
              -
            </button>
            <input
              className="w-8 text-center"
              type="number"
              value={goldValue}
              onChange={handleInputChange}
            />
            <button
              className=" text-2xl m-2"
              onClick={() => handleGoldChange(1)}
            >
              +
            </button>
            <div className="flex justify-center items-center  text-accent ">
              <FaCoins size="50" />
            </div>
          </div>
          <div className="  w-36 h-36">
            <p className=" text-lg">Level</p>
            <button
              className=" text-2xl m-2"
              onClick={() => handleLevelChange(-1)}
            >
              -
            </button>
            <input
              className="w-8 text-center"
              type="number"
              value={levelValue}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10) || 0;
                setLevelValue(newValue);
                writeUserData2(goldValue, newValue, currentHp, maxHp);
              }}
            />
            <button
              className=" text-2xl m-2"
              onClick={() => handleLevelChange(1)}
            >
              +
            </button>
            <div className="flex justify-center items-center  text-accent ">
              <FaUserAlt size="50" />
            </div>
          </div>

          {/* Current HP input field */}
          <div className=" w-48 h-36">
            <p className="  text-lg">HP/MaxHP</p>
            <button
              className=" text-2xl m-2"
              onClick={() => handleHpChange("current", -1)}
            >
              -
            </button>
            <input
              className="w-8 text-center"
              type="number"
              value={currentHp}
              onChange={(e) => handleHpInputChange("current", e)}
            />
            <button
              className=" text-2xl m-2"
              onClick={() => handleHpChange("current", 1)}
            >
              +
            </button>
            <button
              className=" text-2xl m-2"
              onClick={() => handleHpChange("max", -1)}
            >
              -
            </button>
            <input
              className="w-8 text-center"
              type="number"
              value={maxHp}
              onChange={(e) => handleHpInputChange("max", e)}
            />
            <button
              className=" text-2xl m-2"
              onClick={() => handleHpChange("max", 1)}
            >
              +
            </button>
            <div className="flex justify-center  text-accent  items-center">
              <FaHeart size="50" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 justify-center flex gap-2" id="items">
        <button
          className="btn btn-accent "
          onClick={() => window.my_modal_3.showModal()}
        >
          Add Item
        </button>
        <button
          className="btn btn-accent"
          onClick={() => window.my_modal_2.showModal()}
        >
          Add Image
        </button>
        <dialog id="my_modal_3" className="modal">
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
                window.my_modal_3.close(); //this shouldd Close the modal on click
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
              onChange={(e) => setItemType(e.target.value)}
            >
              <option disabled selected>
                Pick an item type:
              </option>
              <option>Weapon</option>
              <option>Magical Item</option>
              <option>Supplies</option>
              <option>Other</option>
            </select>
            <p className="py-4">Item Name</p>
            <input
              type="text"
              required
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <p className="py-4">Item Description</p>
            <textarea
              className="textarea textarea-bordered  w-full max-w-xs"
              placeholder="Bio"
              maxlength="1000"
              required
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            ></textarea>
            <p></p>
            <button type="submit" className="btn mt-2 btn-accent">
              Submit
            </button>
          </form>
        </dialog>
      </div>
      <div id="viewItems" className="flex gap-4 flex-wrap justify-center">
        {items.map((item) => (
          <ItemComponent key={item.id} item={item} onDelete={deleteItem} />
        ))}
      </div>
    </div>
  );
}
