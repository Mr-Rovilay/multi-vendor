import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { validateLogin, validateSignup } from '../validation/validationMiddleware.js';
import { adminDeleteUser, adminGetAllUsers, deleteUserAddress, getUser, getUserInfo, login, signup, updateAvatar, updatePassword, updateUserAddress, updateUserInfo } from '../controllers/authControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', upload, validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/user', verifyToken, getUser);

// Protected Routes (requires authentication)
router.put("/update-user-info", verifyToken, updateUserInfo);
router.put("/update-avatar", verifyToken, upload, updateAvatar);
router.put("/update-user-addresses", verifyToken, updateUserAddress);
router.delete("/delete-user-address/:id", verifyToken, deleteUserAddress);
router.put("/update-user-password", verifyToken, updatePassword);
router.get("/user-info/:id", verifyToken, getUserInfo);

// Admin Routes (requires admin role)
router.get("/admin-all-users", verifyToken,  adminGetAllUsers);
router.delete("/delete-user/:id", verifyToken,  adminDeleteUser);

router.get("/logout", verifyToken, (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.status(201).json({ message: "Logged out successfully" });
  });

export default router;

