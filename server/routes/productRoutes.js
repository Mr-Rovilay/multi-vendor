import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { adminGetAllProduct, createNewReview, createProduct, deleteShopProductId, getAllProduct, getAllProductShop } from '../controllers/productControllers.js';
import { authenticateShop, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-product', upload, createProduct);
router.get('/get-all-products-shop/:id',getAllProductShop);
router.delete('/delete-shop-product/:id',authenticateShop, deleteShopProductId);
router.get('/get-all-product', getAllProduct);
router.get('/admin-all-product',verifyToken, adminGetAllProduct);
 router.put('/create-new-review', verifyToken, createNewReview);



export default router;

