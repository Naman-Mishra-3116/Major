import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDatabase } from "./database/connectDb.js";
import { AuthRouter } from "./route/authRouter.js";

config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from Server");
});


/**
 * @AuthRouter for handling incoming authenticaiton request.
 */
app.use(AuthRouter);





app.listen(PORT, () => {
  console.log(`Application is running on the port ${PORT}`);
  connectToDatabase();
});
