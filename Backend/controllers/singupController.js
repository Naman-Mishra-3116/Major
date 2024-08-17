import { User } from "../models/User.js";
import bcrypt from "bcrypt";

/**
 * @handleSignupRequest is an async fucntion that will handle the incoming signup request.
 * @req is the request containing user data.
 * @res is the response which will be sent to frontend
 */

export const handleSignupRequest = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log(email, password, username);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        message: "A User with the specified email already exist",
        error: false,
        success: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "User Created successfully",
      error: false,
      success: true,
    });
  } catch (err) {
      res.status(200).json({
      message: "Error in the login controller function " + err.message,
      error: true,
      success: false,
    });
  }
};
