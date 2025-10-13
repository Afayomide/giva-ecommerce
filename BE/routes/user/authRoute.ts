import { Router } from "express";
import {
  register,
  login,
  getProfile,
  logout,
  checkAuth,
} from "../../controllers/user/authController";
import { verifyToken } from "../../middleware/verifyToken";
import { validate } from "../../middleware/validators";
import { loginValidator } from "../../validators/authValidor";

const router = Router();

// Public routes
router.post("/signup", register);
router.post("/login", login);

// Protected routes
router.get("/profile", verifyToken, getProfile);
router.get("/me", verifyToken, checkAuth);
router.get("/check-auth", verifyToken, checkAuth);
router.post("/logout", logout);

export default router;
