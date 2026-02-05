import express from "express"
import {
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  getOrdersByCustomer,
} from "../../controllers/admin/orderController"
import { protect, restrictToAdmin } from "../../middleware/admin/auth.middleware"
import { validateOrderStatus } from "../../middleware/admin/validation.middleware"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(protect)
router.use(restrictToAdmin)

// Get all orders
router.route("/").get(getAllOrders)

// Get orders by customer
router.get("/customer/:customerId", getOrdersByCustomer)

// Get, update, and delete order by ID
router.route("/:id").get(getOrderById).patch(updateOrder).delete(deleteOrder)

// Update order status
router.put("/:id/status", updateOrderStatus)

export default router;
