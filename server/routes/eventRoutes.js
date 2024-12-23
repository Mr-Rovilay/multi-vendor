import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { authenticateShop, verifyToken } from '../middleware/authMiddleware.js';
import { adminGetAllEvents, createProductEvent, deleteEventShopProductId, getAllEvents, getAllEventShop } from '../controllers/eventControllers.js';

const router = express.Router();

router.post('/create-event', upload, createProductEvent);
router.get('/get-all-events/:id',getAllEventShop);
router.delete('/delete-shop-event/:id',authenticateShop, deleteEventShopProductId);
router.get('/get-all-events', getAllEvents);
router.get('/admin-all-events', verifyToken, adminGetAllEvents);



export default router;

