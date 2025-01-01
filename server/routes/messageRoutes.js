import express from 'express';
import { createNewMessage, getAllMessage } from '../controllers/messageControllers.js';


const router = express.Router();

router.post("/create-new-message", createNewMessage );
router.get("/get-all-messages/:id", getAllMessage,)





export default router;

