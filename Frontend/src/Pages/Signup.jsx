import React from "react";
import styles from "../Styles/signup.module.css";
import { NavLink } from "react-router-dom";

const Signup = () => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-screen z-10 ${styles.signup}`}
    >
      <div
        className={`flex w-[950px] h-[600px] rounded-lg justify-between bg-[#b1797aad] ${styles.signup_shadow}`}
      >
        <div className="bg-[#b1797aad] w-[45%] flex items-center justify-center rounded-lg"></div>
        <div className="flex flex-col pl-[35px] justify-center bg-gray-200 rounded-tr-lg rounded-br-lg items-start flex-grow">
          <h1 className="text-[60px] font-bold text-[#964143ad] mb-10 ml-2">
            Sign Up
          </h1>
          <div className="flex flex-col gap-2 w-[80%] mb-5 ml-2">
            <label
              htmlFor="username"
              className="text-left text-[20px] text-gray-500"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="bg-slate-100 w-full p-2 rounded-lg outline-none ring-gray-400 ring-2 focus:ring-2 focus:ring-pink-500"
              placeholder="Username"
            />
          </div>
          <div className="flex flex-col gap-2 w-[80%] mb-5 ml-2">
            <label
              htmlFor="email"
              className="text-left text-[20px] text-gray-500"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="bg-slate-100 w-full p-2 rounded-lg outline-none ring-gray-400 ring-2 focus:ring-2 focus:ring-pink-500"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-2 w-[80%] mb-4 ml-2">
            <label
              htmlFor="password"
              className="text-left text-[20px] text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="bg-slate-100 w-full p-2 rounded-lg outline-none ring-gray-400 ring-2 focus:ring-2 focus:ring-pink-500"
              placeholder="Password"
            />
          </div>
          <button className=" text-white bg-[#964143ad] px-8 py-2 ml-2 hover:bg-[#f77b7dad] rounded-full mt-3 mb-3">
            Login
          </button>

          <div className="flex justify-between ml-2 w-[80%] mt-2 text-gray-500">
            <p>Already have an account?</p>
            <NavLink
              to={"/login"}
              end
              className={({ isActive }) => {
                return isActive ? "bg-black" : "hover:text-black";
              }}
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
