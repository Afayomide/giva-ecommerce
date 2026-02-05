import express from "express"
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCategories,
  updateProductStock,
} from "../../controllers/admin/productController"
import { protect, restrictToAdmin } from "../../middleware/admin/auth.middleware"
import { validateProduct } from "../../middleware/admin/validation.middleware"


const router = express.Router()

// Apply authentication middleware to all routes
router.use(protect)
router.use(restrictToAdmin)

// Get all products and create new product
router.route("/").get(getAllProducts).post( createProduct)

// Get product categories
router.get("/categories", getProductCategories)

// Get, update, and delete product by ID
router.route("/:id").get(getProductById).patch(validateProduct, updateProduct).delete(deleteProduct)

// Update product stock
router.patch("/:id/stock", updateProductStock)

router.put("/:id", updateProduct);


export default router;
