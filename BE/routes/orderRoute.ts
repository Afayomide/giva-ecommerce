import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { createOrder, getUserOrders } from "../controllers/orderController";

const router = Router();

router.use(verifyToken);
router.post("/", createOrder);
router.get("/", getUserOrders);

export default router;

