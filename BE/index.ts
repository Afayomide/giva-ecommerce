import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
import compression from "compression";
import cookieParser from "cookie-parser";
require("dotenv").config();

import { verifyToken } from "./middleware/verifyToken";
import connectToMongo from "./config/dbConnection";

// Import user routes
import userAuthRoutes from "./routes/user/authRoute";
import productRoutes from "./routes/productRoute";
import cartRoutes from "./routes/cartRoute";
import orderRoutes from "./routes/orderRoute";
import paymentRoutes from "./routes/paymentRoute";
import categoryRoutes from "./routes/categoryRoute";

// Import admin routes
import adminAuthRoutes from "./routes/admin/auth.routes";
import adminProductRoutes from "./routes/admin/product.routes";
import adminOrderRoutes from "./routes/admin/order.routes";
import adminCustomerRoutes from "./routes/admin/customer.routes";
import adminDashboardRoutes from "./routes/admin/dashboard.routes";
import adminUploadRoutes from "./routes/admin/upload.routes";
import adminStatsRoutes from "./routes/admin/stats.routes";
import adminCategoryRoutes from "./routes/admin/category.routes";

import { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 4000;
const dburl: string = process.env.dburl || "";

const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limiter);

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

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Compress responses
app.use(compression());

// 2) ROUTES
// User routes
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/categories", categoryRoutes);

// Admin routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/customers", adminCustomerRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/upload", adminUploadRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);

// Import error handlers
import { notFound, errorHandler } from "./middleware/admin/error.middleware";

app.use(notFound);
app.use(errorHandler);

declare global {
  namespace Express {
    interface Request {
      user?: any; // or you can specify a type for `user`, e.g., `User`
      admin?: any;
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

process.on("unhandledRejection", (err: any) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err);
  process.exit(1);
});
