import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { createNewMessage, getAllMessage } from '../controllers/messageControllers.js';


const router = express.Router();

router.post("/create-new-message", upload, createNewMessage );
router.get("/get-all-message/:id", getAllMessage,)





export default router;

