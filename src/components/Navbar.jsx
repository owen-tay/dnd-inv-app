import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FaDiceD20, FaUserAlt } from "react-icons/fa";

function Navbar() {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex font-bold justify-between items-center bg-transparent h-12 w-full ">
      <Link to="/">
        <div className="flex text-xl  sm:text-3xl ml-4 hover:scale-105 ease-in-out duration-75 ">
          <FaDiceD20 size="30" />
          DND  Tracker
        </div>
      </Link>

      <div className="mr-3 flex gap-1  text-xl  sm:text-3xl font-bold hover:scale-105 ease-in-out duration-75">
        <FaUserAlt size="30"  />
        {user?.displayName ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : (
          <Link to="/Signin">Sign In</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
