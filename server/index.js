import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Client } from "pg"; // Import the pg client

import { userRoute } from "./routes/userRoutes.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
//middleweare

app.use(express.json());
app.use(cookieParser());

// Database connection
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Use your connection string
});

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

app.use(cors());

//route difinition
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
