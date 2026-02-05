import express from "express"
import { uploadProductImage, deleteProductImage } from "../../controllers/admin/uploadController"
import { protect, restrictToAdmin } from "../../middleware/admin/auth.middleware"
import { uploadMiddleware } from "../../middleware/admin/upload.middleware"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(protect)
router.use(restrictToAdmin)

// Upload product image
router.post("/product-image", uploadMiddleware.single("image"), uploadProductImage)

// Delete product image
router.delete("/product-image/:filename", deleteProductImage)


export default router;
