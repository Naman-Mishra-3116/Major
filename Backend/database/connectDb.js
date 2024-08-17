import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected Succssfully!");
  } catch (err) {
    console.log("Error in conecting the database", err.message);
  }
};
