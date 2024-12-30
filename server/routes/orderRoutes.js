import express from "express";
import {
  createOrder,
  getUserOrders,
  getSellerOrders,
  updateOrderStatus,
  requestRefund,
  acceptRefund,
  getAllOrdersForAdmin
} from "../controllers/orderControllers.js";
import { authenticateShop, isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for creating new order
router.post("/create-order", createOrder);

// Route for getting all orders of a user
router.get("/get-all-orders/:userId", getUserOrders);

// Route for getting all orders for a seller
router.get("/get-seller-all-orders/:shopId", getSellerOrders);

// Route for updating order status by seller
router.put("/update-order-status/:id", authenticateShop, updateOrderStatus);

// Route for requesting a refund by the user
router.put("/order-refund/:id", requestRefund);

// Route for accepting a refund by the seller
router.put("/order-refund-success/:id", authenticateShop,  acceptRefund);

// Route for admin to get all orders
router.get("/admin-all-orders", verifyToken, isAdmin("Admin"), getAllOrdersForAdmin);

export default router;
