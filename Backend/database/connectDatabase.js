import mongoose from "mongoose";

export const connectToDatabase = async function () {
  try {
    const client = await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};
