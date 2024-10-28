import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoutes.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
//middleweare
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173", // or whatever port my frontend runs on locally
      "https://real-estate-smoky-seven.vercel.app", // my production URL
    ],
    credentials: true, // if you need to send cookies or authorization headers
  })
);

//route difinition
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
