import express from 'express';
import { createShop, deleteWithdrawMethod, getShop, getShopInfoById, loginShop, logoutShop, updateSellerInfo, updateShopAvatar, updateWithdrawMethod } from '../controllers/shopController.js';
import {upload} from '../middleware/uploadMiddleware.js';
import { authenticateShop} from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/create-shop', upload, createShop);
router.post('/login-shop', loginShop);
router.get('/get-shop',authenticateShop, getShop);


router.get('/get-shop-info/:id', getShopInfoById); // Get shop info by ID
router.put('/update-shop-avatar', authenticateShop,updateShopAvatar); // Update shop avatar
router.put('/update-seller-info',authenticateShop, updateSellerInfo); // Update seller info

router.put('/withdraw-method',authenticateShop, updateWithdrawMethod); // Update seller withdraw method
router.delete('/withdraw-method', authenticateShop, deleteWithdrawMethod);
router.get("/logout", authenticateShop, (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", });
    res.status(201).json({ message: "Logged out successfully" });
  });

export default router;