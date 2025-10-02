import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Import Routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

//import Database Connection
import connectDB from "./db/connectDb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Frontend origin
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200
};

//Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Importing Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});