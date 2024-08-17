import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const handleLoginRequest = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "User not found. Please recheck your email once",
        error: false,
        success: true,
      });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(200).json({
        message: "Invalid credentials, Please recheck your password",
        error: false,
        success: true,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
        userName: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.status(200).json({
      message: "Loged in Successfully!",
      error: false,
      success: true,
      token,
      username: user.username,
      email: user.email,
    });

  } catch (err) {
      res.status(200).json({
      message: `Error in the login controller function ${err.message}`,
      success: false,
      error: true,
    });
  }
};
