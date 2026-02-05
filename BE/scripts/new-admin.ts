import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../.env") });
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../models/admin";

const dburl = process.env.dburl || "";

if (!dburl) {
  console.error("dburl is not defined in .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(dburl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const createAdmin = async () => {
  try {
    const email = process.argv[2] || "admin@example.com";
    const password = process.argv[3] || "password123";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log(`Admin user with email ${email} already exists`);
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = await Admin.create({
      name: "Admin User",
      email,
      password: hashedPassword,
      role: "super-admin",
    });

    console.log("Admin user created successfully:");
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

// Run the function
createAdmin();
