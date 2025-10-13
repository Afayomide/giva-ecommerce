import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  initiatePayment,
  verifyPayment,
} from "../controllers/paymentController";

const router = Router();

router.use(verifyToken);
router.post("/initiate", initiatePayment);
router.post("/verify", verifyPayment);

export default router;

