import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../controllers/admin/categoryController";
import { protect, restrictToAdmin } from "../../middleware/admin/auth.middleware";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);
router.use(restrictToAdmin);

router.route("/").get(getAllCategories).post(createCategory);

router
  .route("/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

export default router;
