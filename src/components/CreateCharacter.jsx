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
    });
  };

  const { user } = UserAuth();

  //console.log(user?.uid);

  const handleSubmit = (e) => {
    e.preventDefault();

    writeUserData(user?.uid, formState.name, formState.race, formState.level);
    console.log(formState);
  };

  return (
    <div className="flex justify-center items-center w-screen h-80">
      <div className="">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            What is your Characters Name?
            <input
              type="text"
              placeholder="Type here"
              name="name"
              value={formState.name}
              className="input input-bordered w-full"
              onChange={handleChange}
            />
          </label>
      <div className="flex justify-center">
          <button type="submit" className="mt-2 btn btn-accent">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyForm;