import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#c0e3e5] text-black p-4 flex justify-center gap-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-2 py-1 rounded ${isActive ? "bg-yellow-500" : "hover:bg-yellow-600"}`
        }
      >
        Posts
      </NavLink>
    
    </nav>
  );
};

export default Navbar;
