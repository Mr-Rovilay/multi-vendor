import express from 'express';

import { upload } from '../middleware/uploadMiddleware.js';
import { validateLogin, validateSignup } from '../validation/validationMiddleware.js';
import { getUser, login, signup } from '../controllers/authControllers.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', upload.single('avatar'), validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/user', authenticateToken, getUser);

export default router;

