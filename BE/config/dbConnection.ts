import mongoose from "mongoose";

export default async function connectToMongo(dburl: string) {
  const retryAttempts = 3;
  const connectTimeoutMS = 20000;

  for (let attempt = 1; attempt <= retryAttempts; attempt++) {
    try {
      const resolved =
        dburl ||
        (process.env as any).dburl ||
        (process.env as any).DB_URL ||
        (process.env as any).DATABASE_URL ||
        (process.env as any).MONGODB_URI ||
        "";
      if (!resolved) {
        throw new Error("Missing dburl env var");
      }
      await mongoose.connect(resolved);

      console.log("Connected to Database");
      return;
    } catch (error: any) {
      console.error(`Connection attempt ${attempt} failed:`, error.message);

      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(attempt * 2000, 10000))
      );
    }
  }

  throw new Error("Failed to connect to MongoDB Atlas after retries");
}
