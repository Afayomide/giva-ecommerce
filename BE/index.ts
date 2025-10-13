import express from "express";
import cors from "cors";
require("dotenv").config();

import { verifyToken } from "./middleware/verifyToken";
import connectToMongo from "./config/dbConnection";
import userAuthRoutes from "./routes/user/authRoute";
import productRoutes from "./routes/productRoute";
import cartRoutes from "./routes/cartRoute";
import orderRoutes from "./routes/orderRoute";
import paymentRoutes from "./routes/paymentRoute";
import cookieParser from "cookie-parser";

import { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();

const port = 4000;
const dburl: string = process.env.dburl || "";

const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];




app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user/auth", userAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

declare global {
  namespace Express {
    interface Request {
      user?: any; // or you can specify a type for `user`, e.g., `User`
      file?: any;
    }
  }
}

connectToMongo(dburl)
  .then(() => {
    console.log("connection succesful");
  })
  .catch((error) => {
    console.error("Fatal error:", error.message);
  });

app.get("/", (req: any, res: any) => {
  res.send("Givarh Server");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
