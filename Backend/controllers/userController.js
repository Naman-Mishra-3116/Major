import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const cookieOptionsForRefresh = {
  httpOnly: true,
  secure: true,
};
const cookieOptionsForAccess = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshToken = async function (id) {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("No user with the specified id exist");
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save();
    return { refreshToken, accessToken };
  } catch (err) {
    console.error("Error occuring in token utility");
    console.error(err.message);
  }
};
export const singupController = async function (req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      throw new Error("User with the specified email already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "Signed Up successfully!",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

export const renewAccessToken = async function (req, res) {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken) {
      throw new Error("No refresh Token");
    }

    const { id } = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET);
    if (!id) {
      return res.status(200).json({
        message: "Token expired",
        error: true,
        success: false,
        requestRefreshToken: true,
      });
    }

    const user = await User.findById(id).select("-password");
    if (refreshtoken !== user.refreshToken) {
      return res.status(401).json({
        message: "token invalid",
        success: false,
        error: true,
      });
    }

    const newAccessToken = user.generateAccessToken();
    res
      .status(200)
      .cookie("accessToken", newAccessToken, cookieOptionsForAccess)
      .json({
        message: "Created",
        success: true,
        error: false,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (err) {
    if (err.message === "jwt expired") {
      res.status(200).json({
        message: "refresh token expired",
        success: false,
        error: true,
        requestRefreshToken:true
      });
    } else {
      res.status(400).json({
        message: err.message,
        success: false,
        error: true,
      });
    }
  }
};

export const loginController = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User with specified email does not exist");
    }

    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    res
      .status(200)
      .cookie("refreshtoken", refreshToken, cookieOptionsForRefresh)
      .cookie("accesstoken", accessToken, cookieOptionsForAccess)
      .cookie("id", loggedInUser._id, cookieOptionsForRefresh)
      .json({
        message: "Logged in successfully",
        success: true,
        error: false,
        data: {
          accessToken,
          refreshToken,
          username: loggedInUser.username,
          id: loggedInUser._id,
          email: loggedInUser.email,
        },
      });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

export const getLoggedInUserInfo = async function (req, res) {
  try {
    const accessToken = req.cookies.accesstoken;
    if (!accessToken) {
      throw new Error("No Access Token");
    }

    const { id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!id) {
      return res.status(200).json({
        message: "Access token Expired",
        success: false,
        error: true,
        requestToken: true,
      });
    }

    const loggedInUser = await User.findById(id).select(
      "-password -refreshToken"
    );

    if (!loggedInUser) {
      throw new Error("Invalid Access token");
    }

    res.status(200).json({
      message: "Data delivered Successfully",
      error: false,
      success: true,
      data: {
        username: loggedInUser.username,
        id: loggedInUser._id,
        email: loggedInUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
      test: "here i am",
    });
  }
};
