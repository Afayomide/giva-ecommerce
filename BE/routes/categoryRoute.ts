import { Router } from "express";
import Category from "../models/category";

const router = Router();

// @desc    Get all categories for public use
// @route   GET /api/categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch categories" });
  }
});

export default router;
