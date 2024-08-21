import React from "react";
// import { NavLink } from "react-router-dom";
import styles from "../Styles/login.module.css";
const Login = () => {
  return (
    <div className={`flex flex-col items-center justify-center h-[865px] ${styles.login}`}>
      <div className={`flex w-[950px] h-[600px] rounded-lg justify-between bg-[#72a399] ${styles.login_shadow}`}>
        <div className="bg-[#72a399] w-[45%] flex items-center justify-center rounded-lg"></div>
        <div className="flex flex-col pl-[35px] justify-center bg-gray-200 rounded-tr-lg rounded-br-lg items-start flex-grow">
          <h1 className="text-[60px] font-bold text-[#3c6b5f] mb-10 ml-2">
            LOGIN
          </h1>
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
              className="bg-slate-100 w-full p-2 rounded-lg outline-none ring-gray-400 ring-2 focus:ring-2 focus:ring-green-500"
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
              className="bg-slate-100 w-full p-2 rounded-lg outline-none ring-gray-400 ring-2 focus:ring-2 focus:ring-green-500"
              placeholder="Password"
            />
          </div>
          <button className=" text-white bg-green-900 px-8 py-2 ml-2 hover:bg-green-500 rounded-full mt-3 mb-3">
            Login
          </button>

          <div className="flex justify-between ml-2 w-[80%] mt-2 text-gray-500">
            <p>Don't have an account?</p>
            {/* <NavLink to={"/"}>Sign Up</NavLink> */}
            <a href="#">Sign Up</a>
          </div>
          <div className="flex justify-between ml-2 w-[80%] mt-2 text-gray-500">
            <p>Forgot Your Password?</p>
            {/* <NavLink to="#">Sign Up</NavLink> */}
            <a href="#">Reset Your Password</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
