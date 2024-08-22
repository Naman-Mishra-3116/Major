import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = mongoose.Schema;
const userSchema = new schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

userSchema.methods.isValidPassword = async function (recievedPassword) {
  try {
    const isValid = await bcrypt.compare(recievedPassword, this.password);
    return isValid;
  } catch (err) {
    console.error("Error occured in isValidPassword() in User schema ");
    console.error(err.message);
  }
};

userSchema.methods.generateAccessToken = function () {
  try {
    const accessToken = jwt.sign(
      {
        id: this._id,
        email: this.email,
        username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    return accessToken;
  } catch (err) {
    console.error("Error occured in generateAccessToken() in User Schema");
    console.error(err.message);
  }
};

userSchema.methods.generateRefreshToken = function () {
  try {
    const refreshToken = jwt.sign(
      {
        id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    return refreshToken;
  } catch (err) {
    console.error("Error occured in generateRefreshToken() in User Schema");
    console.error(err.message);
  }
};

export const User = new mongoose.model("User", userSchema);
