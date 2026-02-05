import { Request, Response } from "express";
import Product from "../models/product";
import Category from "../models/category";

export const listProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  let products;
  try {
    if (
      typeof searchTerm === "string" &&
      searchTerm.trim() !== "" &&
      searchTerm.trim().toLowerCase() !== "null"
    ) {
      // Find categories that match the search term
      const matchingCategories = await Category.find({
        name: { $regex: searchTerm, $options: "i" }
      });
      const categoryIds = matchingCategories.map(cat => cat._id);

      products = await Product.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { categories: { $in: categoryIds } },
          { types: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
      }).populate("categories").sort({ createdAt: -1 });
    } else {
      products = await Product.find().populate("categories").sort({ createdAt: -1 });
    }
    res.json(products);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate("categories");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch product" });
  }
};
