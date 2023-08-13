import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-between items-center bg-gray-300 h-10 w-full">
      <div>DND Character Tracker</div>

      <div>
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