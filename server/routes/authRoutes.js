import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { validateLogin, validateSignup } from '../validation/validationMiddleware.js';
import { getUser, login, signup } from '../controllers/authControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', upload, validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/user', verifyToken, getUser);
router.get("/logout", verifyToken, (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.status(201).json({ message: "Logged out successfully" });
  });

export default router;

