import express from "express";
import { createWithdrawRequest, getAllWithdrawRequests, updateWithdrawRequest } from "../controllers/withdrawControllers.js";
import { authenticateShop, isAdmin, verifyToken } from "../middleware/authMiddleware.js";



const router = express.Router();

// Route for creating withdraw request -- only for seller
router.post("/create-withdraw-request", authenticateShop, createWithdrawRequest);

// Route for getting all withdraw requests -- admin only
router.get("/get-all-withdraw-request", verifyToken, isAdmin("Admin"), getAllWithdrawRequests);

// Route for updating withdraw request -- admin only
router.put("/update-withdraw-request/:id", verifyToken, isAdmin("Admin"), updateWithdrawRequest);

export default router;
