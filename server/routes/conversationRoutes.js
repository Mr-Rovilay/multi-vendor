import express from 'express';
import { createConversation, getSellerConversation, getUserConversation, updateLastMessage, } from '../controllers/conversationControllers.js';
import { authenticateShop, verifyToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/create-new-conversation", createConversation);
router.get("/get-all-conversation-seller/:id", authenticateShop, getSellerConversation);
router.get("/get-all-conversation-user/:id", verifyToken ,getUserConversation);
router.put("/update-last-message/:id",  updateLastMessage);




export default router;

