import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile,updateUserProfile } from '../Controllers/UserController.js';
import { authenticateUser } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);

export default router;

