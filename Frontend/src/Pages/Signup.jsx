import React, { useEffect } from "react";
import styles from "../Styles/signup.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { createToast } from "./../Utils/createToast";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmitbutton = async function (e) {
    e.preventDefault();
    try {
      setLoading(true);
      const resp = await axios.post(
        `${import.meta.env.VITE_SERVER}/auth/signup`,
        formData
      );
      const { message } = resp.data;
      if (resp.status === 200) {
        createToast(message, "success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      createToast(error.response.data.message, "error");
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
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
          <form className="w-full" onSubmit={handleSubmitbutton}>
            <div className="flex flex-col gap-2 w-[80%] mb-5 ml-2">
              <label
                htmlFor="username"
                className="text-left text-[20px] text-gray-500"
              >
                Username
              </label>
              <input
                onChange={handleInputChange}
                value={formData.username}
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
                onChange={handleInputChange}
                value={formData.email}
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
                onChange={handleInputChange}
                value={formData.password}
                type="password"
                name="password"
                id="password"
                required
                className="bg-slate-100 w-full p-2 rounded-lg outline-none ring-gray-400 ring-2 focus:ring-2 focus:ring-pink-500"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-between w-[80%] mb-4 ml-2">
              <button
                disabled={loading}
                type="submit"
                className=" text-white bg-[#964143ad] px-8 py-2 ml-2 hover:bg-[#f77b7dad] rounded-full mt-3 mb-3"
              >
                {loading ? <HashLoader color="white" size={25} /> : "Login"}
              </button>
            </div>
          </form>

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
