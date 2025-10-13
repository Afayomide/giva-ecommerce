import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cartController";

const router = Router();

router.use(verifyToken);
router.get("/", getCart);
router.post("/add", addToCart);
router.patch("/update", updateCartItem);
router.delete("/item/:itemId", removeCartItem);
router.delete("/clear", clearCart);

export default router;

