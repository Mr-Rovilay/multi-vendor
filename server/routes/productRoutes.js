import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { adminGetAllProduct, createProduct, deleteShopProductId, getAllProduct, getAllProductShop } from '../controllers/productControllers.js';
import { authenticateShop } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-product', upload, createProduct);
router.get('/get-all-products-shop/:id',getAllProductShop);
router.delete('/delete-shop-product/:id',authenticateShop, deleteShopProductId);
router.get('/get-all-product', getAllProduct);
router.get('/admin-get-all-product', adminGetAllProduct);


export default router;

