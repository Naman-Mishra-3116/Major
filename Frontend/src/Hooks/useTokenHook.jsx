import { useEffect } from "react";
import { setAllData } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
axios.defaults.withCredentials = true;
const server = import.meta.env.VITE_SERVER;

export const useTokenHook = function () {
  const dispatch = useDispatch();
  useEffect(() => {
    const getLoggedInUserInfo = async function () {
      try {
        const info = await axios.get(`${server}/auth/getInfo`);
        const { message } = info.data;
        if (message === "Data delivered Successfully") {
          dispatch(
            setAllData({
              isLoggedIn: true,
              name: info.data.data.username,
              id: info.data.data.id,
              email: info.data.data.email,
            })
          );
        }
      } catch (error) {
        if (error.response.data.message === "jwt expired") {
          try {
            const info = await axios.post(`${server}/auth/refresh`);
            const { message, requestRefreshToken } = info.data;
            if (message === "Created") {
              dispatch(
                setAllData({
                  isLoggedIn: true,
                  name: info.data.data.username,
                  id: info.data.data.id,
                  email: info.data.data.email,
                })
              );
            } else if (requestRefreshToken) {
              console.log(message);
              console.log("log out user because refresh token expired");
              // hanlde logout user.
            }
          } catch (error) {
            console.log(error.response, "Inner one");
            console.log("logout the user because some error occured");
          }
        }
      }
    };
    getLoggedInUserInfo();
  }, []);
};
