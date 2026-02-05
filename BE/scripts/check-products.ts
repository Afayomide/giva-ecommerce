import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../.env") });
import mongoose from "mongoose";

const dburl = process.env.dburl || "";

async function check() {
  try {
    await mongoose.connect(dburl);
    const Product = mongoose.connection.collection('products');
    const products = await Product.find({}).limit(5).toArray();
    
    console.log("Product Structure Sample:");
    products.forEach((p, i) => {
      console.log(`
Product ${i + 1}:`, JSON.stringify(p, null, 2));
    });

    process.exit(0);
  } catch (error) {
    console.error("Check failed:", error);
    process.exit(1);
  }
}

check();
