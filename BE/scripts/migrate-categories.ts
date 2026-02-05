import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../.env") });
import mongoose from "mongoose";
import { Category } from "../models/category";

const dburl = process.env.dburl || "";

if (!dburl) {
  console.error("dburl is not defined in .env file");
  process.exit(1);
}

const placeholderImage = "https://via.placeholder.com/400x400.png?text=No+Image";

async function migrate() {
  try {
    await mongoose.connect(dburl);
    console.log("Connected to MongoDB");

    const productCollection = mongoose.connection.collection('products');
    const products = await productCollection.find({}).toArray();
    console.log(`Found ${products.length} products to process`);

    // 1. Collect all unique category names
    const uniqueCategoryNames = new Set<string>();
    products.forEach((product: any) => {
      const cats = product.categories;
      
      if (Array.isArray(cats)) {
        cats.forEach((cat: any) => {
          // Only collect if it's a string (not already an ObjectId)
          if (typeof cat === "string" && cat.trim() && !mongoose.Types.ObjectId.isValid(cat)) {
            uniqueCategoryNames.add(cat.trim());
          }
        });
      }
    });

    const categoryList = Array.from(uniqueCategoryNames);
    console.log(`Found unique categories to migrate: ${categoryList.join(", ")}`);

    if (categoryList.length === 0) {
      console.log("No string-based categories found to migrate. They might already be migrated or missing.");
      process.exit(0);
    }

    // 2. Create Category documents if they don't exist
    const categoryMap: { [key: string]: mongoose.Types.ObjectId } = {};

    for (const name of categoryList) {
      let category = await Category.findOne({ name: new RegExp(`^${name}$`, "i") });
      if (!category) {
        console.log(`Creating new category document: ${name}`);
        category = await Category.create({
          name: name,
          image: placeholderImage,
        });
      }
      categoryMap[name] = category._id as mongoose.Types.ObjectId;
    }

    // 3. Update products to use category IDs instead of strings
    for (const product of products) {
      const currentCategories = product.categories;
      
      if (Array.isArray(currentCategories)) {
        const newCategoryIds: mongoose.Types.ObjectId[] = [];
        let needsUpdate = false;

        for (const cat of currentCategories) {
          if (typeof cat === 'string' && categoryMap[cat]) {
            newCategoryIds.push(categoryMap[cat]);
            needsUpdate = true;
          } else if (mongoose.Types.ObjectId.isValid(cat)) {
            // Keep existing valid ObjectIds
            newCategoryIds.push(new mongoose.Types.ObjectId(cat));
          }
        }

        if (needsUpdate) {
          await productCollection.updateOne(
            { _id: product._id },
            { $set: { categories: newCategoryIds } }
          );
          console.log(`Updated product: ${product.name}`);
        }
      }
    }

    console.log("Migration completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
