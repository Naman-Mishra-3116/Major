import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-end items-center bg-transparent p-5">
      <nav className="flex gap-[50px] justify-center items-center mr-5 mt-2">
        <NavLink
          to="/signup"
          end
          className={({ isActive }) => {
            return isActive
              ? "bg-gray-200 px-5 py-2 rounded-lg"
              : "bg-transparent text-white text-lg";
          }}
        >
          Signup
        </NavLink>
        <NavLink
          to="/login"
          end
          className={({ isActive }) => {
            return isActive
              ? "bg-gray-200 px-5 py-2 rounded-lg"
              : "bg-transparent text-white text-lg";
          }}
        >
          Login
        </NavLink>
        <NavLink
          to="/About"
          end
          className={({ isActive }) => {
            return isActive
              ? "bg-gray-200 px-5 py-2 rounded-lg"
              : "bg-transparent text-white text-lg ";
          }}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
