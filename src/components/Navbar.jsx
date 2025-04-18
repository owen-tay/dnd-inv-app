import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FaDiceD20, FaUserAlt, FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const currentTheme = document.querySelector("html").getAttribute("data-theme");
  const [isDarkMode, setIsDarkMode] = useState(currentTheme === "dark");
  const { user, logOut } = UserAuth();

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.querySelector("html").setAttribute("data-theme", "light");

    } else {
      document.querySelector("html").setAttribute("data-theme", "dark");

    }
    setIsDarkMode(!isDarkMode);
  };

  //changes darkmode icon n that
  const getMoonIcon = () => {
    if (isDarkMode) {
      return <FaSun size="20" className=" text-base-content" />;
    } else {
      return <FaSun size="20"  className=" text-base-content" />;
    }
  };

  const getSunIcon = () => {
    if (isDarkMode) {
      return <FaMoon size="20"  className=" text-base-content"/>;
    } else {
      return <FaMoon size="20" className=" text-base-content" />;
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex font-bold justify-between items-center   h-12 w-full ">
      <Link to="/">
        <div className="flex text-lg items-center  sm:text-3xl ml-4 hover:scale-105 ease-in-out duration-75 ">
          <FaDiceD20 className="rotate-center " size="30" />
          DnD Tracker
        </div>
      </Link>

      <div className="mr-3 flex gap-1   text-lg   sm:text-3xl font-bold">
        <div className="flex hover:scale-105 ease-in-out duration-75 mr-4">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md"

            onClick={toggleDarkMode}
          >
            <span className="sr-only">Toggle Dark Mode</span>
            {isDarkMode ? getMoonIcon() : getSunIcon()}
          </button>
        </div>

        <div className="flex hover:scale-105 ease-in-out duration-75 items-center gap-1">
          <FaUserAlt size="20" />

          {user?.displayName ? (
            <button onClick={handleSignOut}>Logout</button>
          ) : (
            <Link to="/Signin">Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
