import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../.env") });

import mongoose from "mongoose";
import Product, { ProductGender } from "../models/product";

const dburl: string = process.env.dburl || "";

async function run() {
  if (!dburl) {
    console.error("Missing dburl env var");
    process.exit(1);
  }

  await mongoose.connect(dburl);

  const products = [
    {
      name: "Classic White Oxford Shirt",
      categories: ["Trouser"],
      colors: ["white"],
      gender: ProductGender.UNISEX,
      images: ["/white-oxford-shirt.jpg"],
      new: true,
      price: 79.99,
      discountPrice: 0,
      quantity: 50,
      description: ["Timeless white oxford shirt crafted from premium cotton."],
      instructions: ["Machine wash cold"],
      reviews: [],
      status: "in stock",
    },
    {
      name: "Leather Belt",
      category: ["Accessories"],
      color: "black",
      type: ["Sumn"],
      gender: ProductGender.UNISEX,
      images: ["/black-leather-belt.png"],
      new: false,
      price: 89.99,
      discountPrice: 0,
      quantity: 100,
      description: ["Classic full-grain leather belt with polished buckle."],
      instructions: ["Wipe with damp cloth"],
      reviews: [],
      status: "in stock",
    },
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log(`Seeded ${products.length} products`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
