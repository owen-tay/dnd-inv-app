import React, { useState } from "react";
import { writeUserData } from "../firebase";
import { UserAuth } from "../context/AuthContext";


function MyForm() {
  const [formState, setFormState] = useState({
    name: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
      
    }
    )
    location.reload();
    ;
};

  const { user } = UserAuth();

  //console.log(user?.uid);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    writeUserData(user?.uid, formState.name, formState.race, formState.level);
    console.log(formState);
 };
 

  return (
    <div className="flex justify-center items-center bg-green-700 w-screen h-80">
    <div className= " bg-green-400 ">
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        What is your Characters Name?
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </label>
    
      <button type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
}

export default MyForm;