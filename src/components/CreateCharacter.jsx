import React, { useState } from "react";
import { writeUserData } from "../firebase";
import { UserAuth } from "../context/AuthContext";


function MyForm() {
  const [formState, setFormState] = useState({
    name: "",
    type: "",
    race: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const { user } = UserAuth();

  //console.log(user?.uid);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    writeUserData(user?.uid, formState.name, formState.type, formState.race);
    console.log(formState);
 };
 

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="type">
        Type:
        <input
          type="text"
          id="type"
          name="type"
          value={formState.type}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="race">
        Race:
        <input
          type="text"
          id="race"
          name="race"
          value={formState.race}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
