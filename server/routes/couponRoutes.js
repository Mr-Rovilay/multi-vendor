import express from 'express';
import { createCouponCode, deleteCouponCode, getAllCouponCode, getCouponCodeByName } from '../controllers/couponControllers.js';
import { authenticateShop } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/create-coupon-code',authenticateShop,  createCouponCode);
router.get("/get-coupon-value/:name", getCouponCodeByName);
router.get("/get-coupon/:id", authenticateShop, getAllCouponCode)
router.delete("/delete-coupon/:id", authenticateShop, deleteCouponCode)


export default router;

