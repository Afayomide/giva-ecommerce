import express from "express"
import { login, logout, getMe, updatePassword } from "../../controllers/admin/authController"
import { protect, restrictToAdmin } from "../../middleware/admin/auth.middleware"
import { validateLogin, validatePasswordUpdate } from "../../middleware/admin/validation.middleware"

const router = express.Router()

// Public routes - only for admin login
router.post("/login", validateLogin, login)

// Protected routes - only for admin
router.use(protect)
router.use(restrictToAdmin)
router.get("/me", getMe)
router.post("/logout", logout)
router.patch("/update-password", validatePasswordUpdate, updatePassword)

export default router;
