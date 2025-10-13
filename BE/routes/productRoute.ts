import { Router } from "express";
import { getProductById, listProducts } from "../controllers/productController";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);

export default router;

