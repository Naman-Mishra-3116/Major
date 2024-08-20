import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const verifyAuthenticated = async function (req, res, next) {
  try {
    const token = req.cookies.accesstoken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No access Token", error: true, success: false });
    }

    const { id, email, username } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!id) {
      return res
        .status(401)
        .json({ message: "Access Token Expired", success: true, error: false });
    }

    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid access Token", success: true, error: false });
    }

    req.user = { id, email, username };
    next();
  } catch (err) {
    console.error(err.message);
  }
};
