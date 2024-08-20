import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDatabase } from "./database/connectDatabase.js";
import { UserRouter } from "./routes/userRouter.js";
config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

app.use(UserRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
  connectToDatabase();
});
