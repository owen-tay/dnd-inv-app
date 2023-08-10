import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center bg-gray-300 h-10 w-full">
      <div>Navbar</div>

      <div>

        <Link to='/Signin'>Sign In</Link>

      </div>
    </div>
  );
}

export default Navbar;
