import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../Styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { createToast } from "./../Utils/createToast";
import { useDispatch } from "react-redux";
import { setAllData } from "../Store/authSlice";
axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const resp = await axios.post(
        `${import.meta.env.VITE_SERVER}/auth/login`,
        formData
      );
      const { message } = resp.data;
      createToast(message, "success");
      console.log(resp.data.data);
      dispatch(
        setAllData({
          accessToken: resp.data.data.accessToken,
          refreshToken: resp.data.data.refreshToken,
          name: resp.data.data.username,
          email: resp.data.data.email,
          id: resp.data.data.id,
          isLoggedIn: true,
        })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      createToast(error.response.data.message, "error");
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${styles.login}`}
    >
      <div
        className={`flex w-[950px] h-[600px] rounded-lg justify-between bg-[#72a399] ${styles.login_shadow}`}
      >
        <div className="bg-[#72a399] w-[45%] flex items-center justify-center rounded-lg"></div>
        <div className="flex flex-col pl-[35px] justify-center bg-gray-200 rounded-tr-lg rounded-br-lg items-start flex-grow">
          <h1 className="text-[60px] font-bold text-[#3c6b5f] mb-10 ml-2">
            LOGIN
          </h1>
          <form onSubmit={handleLoginFormSubmit} className="w-full">
            <div className="flex flex-col gap-2 w-[80%] mb-5 ml-2">
              <label
                htmlFor="email"
                className="text-left text-[20px] text-gray-500"
              >
                Email
              </label>
              <input
                value={formData.email}
                onChange={handleInputChange}
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
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                name="password"
                id="password"
                required
                className="bg-slate-100 w-full p-2 rounded-lg outline-none ring-gray-400 ring-2 focus:ring-2 focus:ring-green-500"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-between w-[80%] mb-4 ml-2">
              <button
                disabled={loading}
                type="submit"
                className=" text-white bg-green-900 px-8 py-2 ml-2 hover:bg-green-500 rounded-full mt-3 mb-3"
              >
                {loading ? <HashLoader color="white" size={25} /> : "Login"}
              </button>
            </div>
          </form>

          <div className="flex justify-between ml-2 w-[80%] mt-2 text-gray-500">
            <p>Don't have an account?</p>
            <NavLink to={"/signup"}>Sign Up</NavLink>
          </div>
          <div className="flex justify-between ml-2 w-[80%] mt-2 text-gray-500">
            <p>Forgot Your Password?</p>
            <NavLink to="/login">Reset Password</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
