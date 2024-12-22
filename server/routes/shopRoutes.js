import express from 'express';
import { createShop, getShop, loginShop, logoutShop } from '../controllers/shopController.js';
import {upload} from '../middleware/uploadMiddleware.js';
import { authenticateShop} from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/create-shop', upload, createShop);
router.post('/login-shop', loginShop);
router.get('/get-shop',authenticateShop, getShop);
router.get("/logout", authenticateShop, (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.status(201).json({ message: "Logged out successfully" });
  });

export default router;