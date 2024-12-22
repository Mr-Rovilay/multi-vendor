import express from 'express';
import { createShop, getShop, loginShop } from '../controllers/shopController.js';
import {upload} from '../middleware/uploadMiddleware.js';
import { authenticateShop} from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/create-shop', upload, createShop);
router.post('/login-shop', loginShop);
router.get('/get-shop',authenticateShop, getShop);

export default router;